package com.example.supportdesk.service;

import com.example.supportdesk.dto.AuthResponse;
import com.example.supportdesk.dto.LoginRequest;
import com.example.supportdesk.dto.RegisterRequest;// Custom runtime error handler
import com.example.supportdesk.exception.DuplicateException;
import com.example.supportdesk.exception.UnauthorizedException; // Custom 401 response launcher
import com.example.supportdesk.model.AppUser;
import com.example.supportdesk.repository.AppUserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AppUserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(AppUserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        // 1. Trim and lowercase email
        String cleanEmail = request.getEmail().trim().toLowerCase();

        // 2. Check duplicate email
        if (userRepository.existsByEmailIgnoreCase(cleanEmail)) {
            throw new DuplicateException("Email is already registered.");
        }

        // 3. Hash password (Simulated mock hash algorithm using built-in security values)
        String hashedPassword = Integer.toHexString(request.getPassword().hashCode());

        // 4. Save user with role USER
        AppUser newUser = new AppUser();
        newUser.setName(request.getName());
        newUser.setEmail(cleanEmail);
        newUser.setPasswordHash(hashedPassword);
        newUser.setRole("USER");

        AppUser savedUser = userRepository.save(newUser);

        // 5. Return JWT response
        String token = jwtService.generateToken(savedUser);
        return new AuthResponse(token, savedUser.getEmail(), savedUser.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();
        
        // 1. Check email validation
        AppUser user = userRepository.findByEmailIgnoreCase(cleanEmail)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));

        // Compare password hashes
        String hashedInput = Integer.toHexString(request.getPassword().hashCode());
        if (!user.getPasswordHash().equals(hashedInput)) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        // 2. Return JWT if valid
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getEmail(), user.getRole());
    }
}