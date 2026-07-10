package com.example.supportdesk;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Provides basic information about the API, such as health and version.
 */
@RestController
@RequestMapping("/api")
public class AppInfoController {

    /**
     * Health check endpoint to verify that the service is running.
     * @return A map containing the service status.
     */
    @GetMapping("/health")
    public Map<String, String> getHealth() {
        return Map.of("status", "UP", "service", "support-desk-api");
    }

    @GetMapping("/about")
    public Map<String, String> getAbout() {
        return Map.of("appName", "Support Desk API", "version", "1.0.0", "description", "API for managing IT support tickets");
    }
}