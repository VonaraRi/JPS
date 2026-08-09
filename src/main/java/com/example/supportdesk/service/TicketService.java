package com.example.supportdesk.service;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.NotFoundException;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import com.example.supportdesk.dto.CreateTicketRequest;
import com.example.supportdesk.dto.UpdateTicketRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.Instant;

@Service
public class TicketService {

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getAllTickets(String status, String priority, String category) {
        log.info("Fetching tickets with filters -> status: {}, priority: {}, category: {}", status, priority, category);
        
        List<Ticket> tickets;

        if (status != null && !status.trim().isEmpty()) {
            tickets = ticketRepository.findByStatus(status);
        } else if (priority != null && !priority.trim().isEmpty()) {
            tickets = ticketRepository.findByPriority(priority);
        } else if (category != null && !category.trim().isEmpty()) {
            tickets = ticketRepository.findByCategory(category);
        } else {
            tickets = ticketRepository.findAll();
        }

        return tickets.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TicketResponse getTicketById(String id) {
        Ticket ticket = findTicketOrThrow(id);
        return mapToResponse(ticket);
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        log.info("Attempting to create a new ticket with title: '{}' by user: {}", request.getTitle(), request.getCreatedBy());
        
        Ticket ticket = new Ticket();
        ticket.setTitle(normalizeRequired(request.getTitle()));
        ticket.setDescription(normalizeRequired(request.getDescription()));
        ticket.setCategory(normalizeRequired(request.getCategory()));
        ticket.setPriority(normalizePriority(request.getPriority()));
        ticket.setCreatedBy(normalizeRequired(request.getCreatedBy()));
        
        ticket.setStatus(normalizeStatus(null)); // Defaults to "Open"
        ticket.setCreatedAt(Instant.now());

        Ticket savedTicket = ticketRepository.save(ticket);
        
        log.info("Successfully created ticket in MongoDB. Assigned ID: {}", savedTicket.getId());
        return mapToResponse(savedTicket);
    }

    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        log.info("Attempting to update ticket with ID: {}", id);

        Ticket ticket = findTicketOrThrow(id);

        ticket.setTitle(normalizeRequired(request.getTitle()));
        ticket.setDescription(normalizeRequired(request.getDescription()));
        ticket.setCategory(normalizeRequired(request.getCategory()));
        ticket.setPriority(normalizePriority(request.getPriority()));
        ticket.setStatus(normalizeStatus(request.getStatus()));

        Ticket updatedTicket = ticketRepository.save(ticket);

        log.info("Successfully updated ticket with ID: {}", updatedTicket.getId());
        return mapToResponse(updatedTicket);
    }

    public Page<TicketResponse> getAllTicketsPaged(int page, int size, String sortBy, String direction) {
        log.info("Fetching paginated tickets -> Page: {}, Size: {}, SortBy: {}, Direction: {}", page, size, sortBy, direction);
        
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        return ticketRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    // --- Private Helper Methods ---

    private Ticket findTicketOrThrow(String id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found: " + id));
    }

    private String normalizeRequired(String value) {
        return (value != null) ? value.trim() : null;
    }

    private String normalizeStatus(String status) {
        if (status == null || status.trim().isEmpty()) {
            return "Open";
        }
        return status.trim();
    }

    private String normalizePriority(String priority) {
        if (priority == null || priority.trim().isEmpty()) {
            return "MEDIUM";
        }
        return priority.trim();
    }

    private TicketResponse mapToResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getCategory(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedBy(),
                ticket.getCreatedAt()
        );
    }
}