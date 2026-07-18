package com.example.supportdesk.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ApiDocsController {

    private static final Logger logger = LoggerFactory.getLogger(ApiDocsController.class);

    @GetMapping("/api/docs")
    public ResponseEntity<Map<String, Object>> getApiDocumentation() {
        logger.info("API Documentation catalog requested by client.");

        // Clean, immutable collection block
        List<Map<String, String>> endpoints = List.of(
            Map.of(
                "method", "POST",
                "path", "/api/auth/register",
                "access", "Public",
                "description", "Register a new user."
            ),
            Map.of(
                "method", "POST",
                "path", "/api/auth/login",
                "access", "Public",
                "description", "User login to receive a JWT authentication token."
            ),
            Map.of(
                "method", "GET",
                "path", "/api/v1/tickets",
                "access", "USER or ADMIN",
                "description", "List support tickets."
            )
        );

        Map<String, Object> responseBody = Map.of(
            "application", "Support Desk Ticket API",
            "version", "v1",
            "baseUrl", "/api/v1",
            "endpoints", endpoints
        );

        return ResponseEntity.ok(responseBody);
    }
}