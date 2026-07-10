package com.example.supportdesk.service;

import com.example.supportdesk.dto.TicketResponse;
import com.example.supportdesk.exception.NotFoundException;
import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public TicketResponse getTicketById(String id) {
        ObjectId objectId;
        try {
            objectId = new ObjectId(id);
        } catch (IllegalArgumentException ex) {
            throw new NotFoundException("Ticket not found: " + id);
        }

        Ticket ticket = ticketRepository.findById(objectId)
                .orElseThrow(() -> new NotFoundException("Ticket not found: " + id));
        return toResponse(ticket);
    }

    private TicketResponse toResponse(Ticket t) {
        return new TicketResponse(
                t.getId() != null ? t.getId().toHexString() : null,
                t.getTitle(),
                t.getDescription(),
                t.getCategory(),
                t.getPriority(),
                t.getStatus(),
                t.getCreatedBy(),
                t.getCreatedAt()
        );
    }
}
