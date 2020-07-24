package com.expensetracker.expenseservice.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.expenseservice.dto.AddIncomeRequestDto;
import com.expensetracker.expenseservice.dto.MonthlyIncomeRequest;
import com.expensetracker.expenseservice.service.IncomeService;

@RestController
public class IncomeController {

	private static Logger LOGGER = LoggerFactory.getLogger(IncomeController.class);
	
	@Autowired
	private IncomeService incomeService;

	@PostMapping("/add-income")
	public void addIncome(@RequestHeader(name = "Authorization") String authorization, @RequestBody AddIncomeRequestDto incomeRequest) {
		LOGGER.info("Token: "+authorization);
		incomeService.addIncomeForUser(incomeRequest, authorization.replace("Bearer ", ""));	
	}
	
	@PostMapping("/monthly-income/add")
	public void addMonthlyIncome(@RequestHeader(name="Authorization")String authorization, 
			@RequestBody @Valid MonthlyIncomeRequest monthlyIncomeRequest) {
		LOGGER.info("Token: {}",authorization);
		incomeService.addMonthlyIncomeForUser(monthlyIncomeRequest, authorization.replace("Bearer ", ""));
	}
}
