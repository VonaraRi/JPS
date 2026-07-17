package com.example.supportdesk.config;

import com.example.supportdesk.model.AppUser;
import com.example.supportdesk.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@example.com";

        // Check if the admin user already exists (case-insensitive)
        if (!userRepository.existsByEmailIgnoreCase(adminEmail)) {
            AppUser admin = new AppUser();
            admin.setName("Admin User");
            admin.setEmail(adminEmail);
            
            // Hash the password before saving to the database
            admin.setPasswordHash(passwordEncoder.encode("Admin@12345"));
            admin.setRole("ADMIN");

            userRepository.save(admin);
            System.out.println(">> UserDataSeeder: Default ADMIN account created successfully.");
        } else {
            System.out.println(">> UserDataSeeder: ADMIN account already exists. Skipping seeding.");
        }
    }
}