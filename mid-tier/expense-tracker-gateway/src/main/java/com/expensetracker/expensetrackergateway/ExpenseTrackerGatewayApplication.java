package com.expensetracker.expensetrackergateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class ExpenseTrackerGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerGatewayApplication.class, args);
	}

}
