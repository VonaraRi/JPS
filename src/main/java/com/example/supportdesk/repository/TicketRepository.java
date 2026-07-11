package com.example.supportdesk.repository;

import com.example.supportdesk.model.Ticket;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    // This interface automatically inherits all MongoDB CRUD methods (save, find, delete, etc.)
    List<Ticket> findByStatus(String status);
    List<Ticket> findByPriority(String priority);
    List<Ticket> findByCategory(String category);
}