package com.example.supportdesk.config;

import com.example.supportdesk.model.AppUser;
import com.example.supportdesk.repository.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataSeeder implements CommandLineRunner {

    private final AppUserRepository userRepository;

    public UserDataSeeder(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@example.com";

        // 1. Force remove the old BCrypt record to clean the state
        userRepository.findByEmailIgnoreCase(adminEmail).ifPresent(user -> {
            userRepository.delete(user);
            System.out.println(">> UserDataSeeder: Old admin record deleted.");
        });

        // 2. Create the fresh user with the matching mock hash algorithm
        AppUser admin = new AppUser();
        admin.setName("Jason");
        admin.setEmail(adminEmail);
        
        // Match the exact hashing calculation used in AuthService
        String rawPassword = "Admin@12345";
        String mockHash = Integer.toHexString(rawPassword.hashCode());
        admin.setPasswordHash(mockHash);
        
        admin.setRole("ADMIN");

        userRepository.save(admin);
        System.out.println(">> UserDataSeeder: Fresh ADMIN account created with matching mock hash.");
    }
}