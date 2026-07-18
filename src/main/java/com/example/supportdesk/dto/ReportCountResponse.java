package com.example.supportdesk.dto;

import org.springframework.data.mongodb.core.mapping.Field;

public class ReportCountResponse {
    
    @Field("_id") // Maps MongoDB's grouped ID field to "label"
    private String label;
    private long count;

    public ReportCountResponse() {}

    public ReportCountResponse(String label, long count) {
        this.label = label;
        this.count = count;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public long getCount() { return count; }
    public void setCount(long count) { this.count = count; }
}