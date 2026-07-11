package com.example.supportdesk.service;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.NotFoundException;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import com.example.supportdesk.dto.CreateTicketRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.Instant;

@Service
public class TicketService {

    // 1. Inject the TicketRepository instead of using a local HashMap
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // 2. Fetch all tickets from MongoDB and map them to TicketResponse DTOs
    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 3. Fetch a single ticket by its ID from MongoDB
    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ticket not found: " + id));
        return mapToResponse(ticket);
    }

    // 4. Create a new ticket and save it to MongoDB
    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCategory(request.getCategory());
        ticket.setPriority(request.getPriority());
        ticket.setCreatedBy(request.getCreatedBy());
        
        // Set default backend values automatically
        ticket.setStatus("Open");
        ticket.setCreatedAt(Instant.now());

        Ticket savedTicket = ticketRepository.save(ticket);
        return mapToResponse(savedTicket);
    }

    // Helper method to cleanly map your MongoDB Entity (Ticket) to your DTO (TicketResponse)
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