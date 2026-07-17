package com.example.supportdesk.repository;

import com.example.supportdesk.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository; // Or JpaRepository depending on your DB
import java.util.Optional;

public interface UserRepository extends MongoRepository<AppUser, String> {
    Optional<AppUser> findByEmail(String email);
    
    // Required for the seeder's duplicate check
    boolean existsByEmailIgnoreCase(String email);
}