package com.example.supportdesk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF since APIs are stateless (token-based)
            .csrf(csrf -> csrf.disable())
            
            // Set authorization rules
            .authorizeHttpRequests(auth -> auth
                .dispatcherTypeMatchers(jakarta.servlet.DispatcherType.ERROR).permitAll()
                .requestMatchers("/error").permitAll()

                // ==========================================
                //  Public endpoints
                // ==========================================
                // Added /api/v1/info to the public GET rules here
                .requestMatchers(HttpMethod.GET, "/api/health", "/api/v1/info").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/register", "/api/auth/login").permitAll()
                
                // ==========================================
                // API Documentation Security Rules
                // ==========================================
                // Allows completely public access to the /api/docs routes
                .requestMatchers("/api/docs", "/api/docs/**").permitAll()

                // ==========================================
                // API V1 Reports Routes Security Rules
                // ==========================================
                // Covers both status and priority report requests
                .requestMatchers(HttpMethod.GET,
                    "/api/v1/reports/tickets-by-status",
                    "/api/v1/reports/tickets-by-priority"
                ).hasAnyRole("USER", "ADMIN")

                // ==========================================
                // API V1 Versioned Routes Security Rules
                // ==========================================
                // GET /api/v1/tickets and /api/v1/tickets/{id} require USER or ADMIN
                .requestMatchers(HttpMethod.GET, "/api/v1/tickets", "/api/v1/tickets/*")
                    .hasAnyRole("USER", "ADMIN")
                
                // POST /api/v1/tickets requires USER or ADMIN
                .requestMatchers(HttpMethod.POST, "/api/v1/tickets")
                    .hasAnyRole("USER", "ADMIN")

                // ==========================================
                // LEGACY: Old Routes Security Rules (Kept Intact)
                // ==========================================
                // Protected endpoints: GET tickets (Accessible by USER and ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/tickets", "/api/tickets/*")
                    .hasAnyRole("USER", "ADMIN")

                // Protected endpoints: POST tickets (Accessible ONLY by ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/tickets")
                    .hasRole("ADMIN")

                // Any other request must be authenticated
                .anyRequest().authenticated()
            )
            
            // Force Spring Security to return 401 Unauthorized when an unauthenticated request attempts access
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType("application/json");
                    response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"" + authException.getMessage() + "\"}");
                })
            )
            
            // Keep sessions stateless
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // Add your JWT filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}