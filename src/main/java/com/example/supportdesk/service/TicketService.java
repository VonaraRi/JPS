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

    // Initialize the SLF4J logger instance
    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Updated with Logging for Filters
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
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found: " + id));
        return mapToResponse(ticket);
    }

    // Updated with Logging for Ticket Creation
    public TicketResponse createTicket(CreateTicketRequest request) {
        log.info("Attempting to create a new ticket with title: '{}' by user: {}", request.getTitle(), request.getCreatedBy());
        
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setCreatedBy(request.getCreatedBy());
        
        ticket.setStatus("Open");
        ticket.setCreatedAt(Instant.now());

        Ticket savedTicket = ticketRepository.save(ticket);
        
        log.info("Successfully created ticket in MongoDB. Assigned ID: {}", savedTicket.getId());
        return mapToResponse(savedTicket);
    }

    // NEW: Update Ticket Method
    public TicketResponse updateTicket(String id, UpdateTicketRequest request) {
        log.info("Attempting to update ticket with ID: {}", id);

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found: " + id));

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(request.getStatus());

        Ticket updatedTicket = ticketRepository.save(ticket);

        log.info("Successfully updated ticket with ID: {}", updatedTicket.getId());
        return mapToResponse(updatedTicket);
    }

    // Updated with Logging for Pagination
    public Page<TicketResponse> getAllTicketsPaged(int page, int size, String sortBy, String direction) {
        log.info("Fetching paginated tickets -> Page: {}, Size: {}, SortBy: {}, Direction: {}", page, size, sortBy, direction);
        
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        return ticketRepository.findAll(pageable)
                .map(this::mapToResponse);
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