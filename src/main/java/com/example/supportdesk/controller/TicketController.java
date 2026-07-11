package com.example.supportdesk.controller;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.service.TicketService;
import com.example.supportdesk.dto.CreateTicketRequest;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping(path = "/api/tickets", produces = MediaType.APPLICATION_JSON_VALUE)
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Updated to accept optional query parameters: ?status=..., ?priority=..., ?category=...
    @GetMapping
    public List<TicketResponse> getAll(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category) {
            
        return ticketService.getAllTickets(status, priority, category);
    }

    @GetMapping("/{id}")
    public TicketResponse getById(@PathVariable String id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody CreateTicketRequest request) {
        // 1. Safe Null Check: Check if fields are null first, THEN check if they are empty
        if (request.getTitle() == null || request.getTitle().trim().isEmpty() ||
            request.getDescription() == null || request.getDescription().trim().isEmpty() ||
            request.getCategory() == null || request.getCategory().trim().isEmpty() ||
            request.getPriority() == null || request.getPriority().trim().isEmpty() ||
            request.getCreatedBy() == null || request.getCreatedBy().trim().isEmpty()) {
            
            // Returns a clean 400 Bad Request instead of breaking with a 500 Error
            return new ResponseEntity<>("Required fields cannot be empty", HttpStatus.BAD_REQUEST);
        }
        
        TicketResponse response = ticketService.createTicket(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED); 
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<TicketResponse>> getAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        
        Page<TicketResponse> pagedTickets = ticketService.getAllTicketsPaged(page, size, sortBy, direction);
        return ResponseEntity.ok(pagedTickets);
}
}