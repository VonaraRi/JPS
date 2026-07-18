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
import java.util.Set;
import java.util.Map;

@RestController
// Updated path to include '/v1' http routes
@RequestMapping(path = "/api/v1/tickets", produces = MediaType.APPLICATION_JSON_VALUE)
public class TicketController {

    private final TicketService ticketService;

    // A whitelist set containing your database entity fields allowed for sorting
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("id", "title", "status", "priority", "category", "createdAt", "assetTag");

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

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
        if (request.getTitle() == null || request.getTitle().trim().isEmpty() ||
            request.getDescription() == null || request.getDescription().trim().isEmpty() ||
            request.getCategory() == null || request.getCategory().trim().isEmpty() ||
            request.getPriority() == null || request.getPriority().trim().isEmpty() ||
            request.getCreatedBy() == null || request.getCreatedBy().trim().isEmpty()) {
            
            return new ResponseEntity<>("Required fields cannot be empty", HttpStatus.BAD_REQUEST);
        }
        
        TicketResponse response = ticketService.createTicket(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED); 
    }

    @GetMapping("/paged")
    public ResponseEntity<?> getAllPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        
        if (page < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Bad Request", "message", "Page index must not be less than zero"));
        }

        if (size <= 0 || size > 50) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Bad Request", "message", "Page size must be between 1 and 50"));
        }

        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Bad Request", "message", "Invalid sort field property: " + sortBy));
        }
        
        Page<TicketResponse> pagedTickets = ticketService.getAllTicketsPaged(page, size, sortBy, direction);
        return ResponseEntity.ok(pagedTickets);
    }
}