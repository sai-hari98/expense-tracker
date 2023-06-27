package com.expensetracker.expenseservice.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.expensetracker.expenseservice.entity.Expense;
import com.expensetracker.expenseservice.entity.MonthlyBillReminder;
import com.expensetracker.expenseservice.service.ExpenseService;

@RequestMapping("/expense")
@RestController
public class ExpenseController {

	@Autowired
	private ExpenseService expenseService;

	@PostMapping("/add")
	public void addExpense(@RequestHeader(name = "Authorization") String auth, @RequestBody @Valid Expense expense) {
		expenseService.addExpense(auth.replace("Bearer ", ""), expense);
	}
}
