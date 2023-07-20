package com.expensetracker.expenseservice.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Configuration
public class ExpenseServiceConfig {

    @Bean(name = "googleSheetsRestTemplate")
    public RestTemplate createGoogleSheetsRestTemplate(RestTemplateBuilder restTemplateBuilder){
        return restTemplateBuilder
                .setConnectTimeout(Duration.of(2, ChronoUnit.SECONDS))
                .setReadTimeout(Duration.of(2, ChronoUnit.SECONDS))
                .rootUri("https://sheets.googleapis.com")
                .build();
    }
}
