package com.example.supportdesk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF for stateless APIs
            .csrf(csrf -> csrf.disable())
            
            // 2. Disable default basic login popups
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable())
            
            // 3. Force stateless session management
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 4. Configure permissions
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Allow registration/login
                .requestMatchers("/error").permitAll()       // Allow Spring's internal error mapping
                .anyRequest().authenticated()               // Secure everything else
            );

        return http.build();
    }
}