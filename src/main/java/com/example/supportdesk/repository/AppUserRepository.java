package com.example.supportdesk.repository;

import com.example.supportdesk.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AppUserRepository extends MongoRepository<AppUser, String> {

    // Finds a user profile by email while ignoring case differences
    Optional<AppUser> findByEmailIgnoreCase(String email);

    // Checks if an email is already registered in the system, ignoring case
    boolean existsByEmailIgnoreCase(String email);
}