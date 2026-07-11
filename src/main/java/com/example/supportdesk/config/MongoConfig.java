package com.example.supportdesk.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        // This explicitly forces Spring Data to use your support desk database
        return "support_desk_db";
    }

    @Override
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb://desk_user:DeskPassword123@localhost:27017/support_desk_db?authSource=support_desk_db");
    }

    @Override
    protected boolean autoIndexCreation() {
        return true;
    }
}