package com.expensetracker.expenseservice.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.expenseservice.dto.AddIncomeRequestDto;
import com.expensetracker.expenseservice.entity.MonthlyIncomeSource;
import com.expensetracker.expenseservice.service.IncomeService;

@RestController
public class IncomeController {

	private static Logger LOGGER = LoggerFactory.getLogger(IncomeController.class);

	@Autowired
	private IncomeService incomeService;

	@PostMapping("/add-income")
	public void addIncome(@RequestHeader(name = "Authorization") String authorization,
			@RequestBody @Valid AddIncomeRequestDto incomeRequest) {
		LOGGER.info("Token: " + authorization);
		incomeService.addIncomeForUser(incomeRequest, authorization.replace("Bearer ", ""));
	}

	@PostMapping("/monthly-income/add")
	public void addMonthlyIncome(@RequestHeader(name = "Authorization") String authorization,
			@RequestBody @Valid MonthlyIncomeSource monthlyIncomeSource) {
		LOGGER.info("Token: {}", authorization);
		incomeService.addMonthlyIncomeForUser(monthlyIncomeSource, authorization.replace("Bearer ", ""));
	}

	@DeleteMapping("/monthly-income/delete")
	public void removeMonthlyIncome(@RequestParam(name = "id") int id) {
		incomeService.removeMonthlyIncome(id);
	}

	@GetMapping("/monthly-income/get")
	public List<MonthlyIncomeSource> getMonthlyIncomeForUser(
			@RequestHeader(name = "Authorization") String authorization) {
		return incomeService.getMonthlyIncomeSources(authorization.replace("Bearer ", ""));
	}
	
}
