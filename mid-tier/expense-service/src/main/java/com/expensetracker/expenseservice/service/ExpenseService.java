package com.expensetracker.expenseservice.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.expenseservice.entity.Expense;
import com.expensetracker.expenseservice.entity.MonthlyBillReminder;
import com.expensetracker.expenseservice.entity.User;
import com.expensetracker.expenseservice.repository.ExpenseRepository;
import com.expensetracker.expenseservice.repository.MonthlyBillReminderRepository;
import com.expensetracker.expenseservice.util.ExpenseServiceUtils;

@Service
public class ExpenseService {

	@Autowired
	private ExpenseServiceUtils expenseServiceUtils;

	@Autowired
	private MonthlyBillReminderRepository billReminderRepository;

	@Autowired
	private ExpenseRepository expenseRepository;

	@Transactional
	public List<MonthlyBillReminder> getBillReminders(String jwtToken) {
		User user = expenseServiceUtils.getUserByToken(jwtToken);
		if (user != null) {
			return billReminderRepository.getMonthlyBillRemindersById(user.getUserId());
		} else {
			return new ArrayList<>();
		}
	}

	@Transactional
	public void addBillReminder(MonthlyBillReminder billReminder, String jwtToken) {
		User user = expenseServiceUtils.getUserByToken(jwtToken);
		billReminder.setUser(user);
		billReminderRepository.save(billReminder);
	}

	@Transactional
	public void removeBillReminder(int id) {
		billReminderRepository.deleteById(id);
	}

	@Transactional
	public void addExpense(String jwtToken, Expense expense) {
		User user = expenseServiceUtils.getUserByToken(jwtToken);
		expense.setUser(user);
		expenseRepository.save(expense);
	}

}
