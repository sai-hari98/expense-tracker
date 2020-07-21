package com.expensetracker.expensetrackergateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@EnableZuulProxy
@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
public class ExpenseTrackerGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerGatewayApplication.class, args);
	}
	
	@Bean
	public RestTemplate getRestTemplateBean(RestTemplateBuilder builder) {
		return builder.build();
	}

}
