package com.expensetracker.expenseservice.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.expenseservice.entity.Expense;
import com.expensetracker.expenseservice.entity.MonthlyBillReminder;
import com.expensetracker.expenseservice.service.ExpenseService;

@RestController
public class ExpenseController {

	@Autowired
	private ExpenseService expenseService;

	@GetMapping("/bill-reminder/get")
	public List<MonthlyBillReminder> getBillReminders(@RequestHeader(name = "Authorization") String auth) {
		return expenseService.getBillReminders(auth.replace("Bearer ", ""));
	}

	@PostMapping("/bill-reminder/add")
	public void addBillReminder(@RequestHeader(name = "Authorization") String auth,
			@RequestBody @Valid MonthlyBillReminder billReminder) {
		expenseService.addBillReminder(billReminder, auth.replace("Bearer ", ""));
	}

	@DeleteMapping("/bill-reminder/delete")
	public void deleteMonthlyReminder(@RequestParam(name = "id") int id) {
		expenseService.removeBillReminder(id);
	}

	@PostMapping("/expense/add")
	public void addExpense(@RequestHeader(name = "Authorization") String auth, @RequestBody @Valid Expense expense) {
		expenseService.addExpense(auth.replace("Bearer ", ""), expense);
	}
}
