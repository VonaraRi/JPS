package com.example.AssetTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = {
    "com.example.AssetTracker",
    "com.example.supportdesk"
})
@EnableMongoRepositories(basePackages = "com.example.supportdesk.repository")
public class AssetTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(AssetTrackerApplication.class, args);
    }
}