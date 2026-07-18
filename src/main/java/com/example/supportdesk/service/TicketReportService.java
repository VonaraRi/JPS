package com.example.supportdesk.service;

import com.example.supportdesk.dto.ReportCountResponse;
import com.example.supportdesk.model.Ticket;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketReportService {

    private final MongoTemplate mongoTemplate;

    public TicketReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<ReportCountResponse> getTicketsCountByStatus() {
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.group("status").count().as("count")
        );

        AggregationResults<ReportCountResponse> results = mongoTemplate.aggregate(
            aggregation,
            Ticket.class, // Your source collection mapping class
            ReportCountResponse.class
        );

        return results.getMappedResults();
    }
}