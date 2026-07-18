package com.example.supportdesk.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ApiDocsController {

    private static final Logger logger = LoggerFactory.getLogger(ApiDocsController.class);

    @GetMapping("/api/docs")
    public ResponseEntity<Map<String, Object>> getApiDocumentation() {
        logger.info("API Documentation catalog requested by client.");

        Map<String, String> registerEndpoint = new LinkedHashMap<>();
        registerEndpoint.put("method", "POST");
        registerEndpoint.put("path", "/api/auth/register");
        registerEndpoint.put("access", "Public");
        registerEndpoint.put("description", "Register a new user.");

        Map<String, String> loginEndpoint = new LinkedHashMap<>();
        loginEndpoint.put("method", "POST");
        loginEndpoint.put("path", "/api/auth/login");
        loginEndpoint.put("access", "Public");
        loginEndpoint.put("description", "User login to receive a JWT authentication token.");

        Map<String, String> ticketsEndpoint = new LinkedHashMap<>();
        ticketsEndpoint.put("method", "GET");
        ticketsEndpoint.put("path", "/api/v1/tickets");
        ticketsEndpoint.put("access", "USER or ADMIN");
        ticketsEndpoint.put("description", "List support tickets.");

        // Add them to the immutable endpoints wrapper list
        List<Map<String, String>> endpoints = List.of(registerEndpoint, loginEndpoint, ticketsEndpoint);

        // Main response payload using LinkedHashMap to guarantee serialization key order
        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("application", "Support Desk Ticket API");
        responseBody.put("version", "v1");
        responseBody.put("baseUrl", "/api/v1");
        responseBody.put("endpoints", endpoints);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/api/v1/info")
    public ResponseEntity<Map<String, String>> getApiInfo() {
        logger.info("Public API Info requested by client.");
        
        Map<String, String> info = new LinkedHashMap<>();
        info.put("application", "Support Desk Ticket API");
        info.put("version", "v1");
        info.put("status", "Running");
        
        return ResponseEntity.ok(info);
    }
}