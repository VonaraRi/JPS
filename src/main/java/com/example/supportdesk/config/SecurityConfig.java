package com.example.supportdesk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
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
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF since APIs are stateless (token-based)
            .csrf(csrf -> csrf.disable())
            
            // 2. Set authorization rules
            .authorizeHttpRequests(auth -> auth
                // Allow the error dispatcher so you can see real exceptions instead of a silent 403
                .dispatcherTypeMatchers(jakarta.servlet.DispatcherType.ERROR).permitAll()
                .requestMatchers("/error").permitAll()

                // Public endpoints
                .requestMatchers(HttpMethod.GET, "/api/health").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/register", "/api/auth/login").permitAll()

                // Protected endpoints: GET tickets (Accessible by USER and ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/tickets", "/api/tickets/*")
                    .hasAnyRole("USER", "ADMIN")

                // Protected endpoints: POST tickets (Accessible ONLY by ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/tickets")
                    .hasRole("ADMIN")

                // Any other request must be authenticated
                .anyRequest().authenticated()
            )
            
            // 3. Force Spring Security to return 401 Unauthorized when an unauthenticated request attempts access
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType("application/json");
                    response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"" + authException.getMessage() + "\"}");
                })
            )
            
            // 4. Keep sessions stateless
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // 5. Add your JWT filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}