package com.example.supportdesk.repository;

import com.example.supportdesk.model.Ticket;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, ObjectId> {
    // This interface automatically inherits all MongoDB CRUD methods (save, find, delete, etc.)
}