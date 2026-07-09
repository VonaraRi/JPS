package com.example.AssetTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.example.supportdesk.repository")
public class AssetTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(AssetTrackerApplication.class, args);
    }
}