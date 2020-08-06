package com.expensetracker.expenseservice.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.expenseservice.dto.AddIncomeRequestDto;
import com.expensetracker.expenseservice.entity.Income;
import com.expensetracker.expenseservice.entity.MonthlyIncomeSource;
import com.expensetracker.expenseservice.entity.User;
import com.expensetracker.expenseservice.repository.IncomeRepository;
import com.expensetracker.expenseservice.repository.MonthlyIncomeSourceRepository;
import com.expensetracker.expenseservice.util.ExpenseServiceUtils;

@Service
public class IncomeService {

	@Autowired
	private IncomeRepository incomeRepository;

	@Autowired
	private MonthlyIncomeSourceRepository monthlyIncomeRepository;

	@Autowired
	private ExpenseServiceUtils expenseServiceUtils;

	@Transactional
	public void addIncomeForUser(AddIncomeRequestDto incomeRequest, String jwtToken) {
		Income income = new Income();
		income.setIncomeCategory(incomeRequest.getIncomeCategory());
		income.setIncomeDescription(incomeRequest.getDescription());
		income.setDate(incomeRequest.getDate());
		income.setAmount(incomeRequest.getAmount());
		User user = expenseServiceUtils.getUserByToken(jwtToken);
		income.setUser(user);
		incomeRepository.save(income);
	}

	@Transactional
	public void addMonthlyIncomeForUser(MonthlyIncomeSource monthlyIncomeSource, String jwtToken) {
		User user = expenseServiceUtils.getUserByToken(jwtToken);
		monthlyIncomeSource.setUser(user);
		monthlyIncomeRepository.save(monthlyIncomeSource);
	}

	@Transactional
	public List<MonthlyIncomeSource> getMonthlyIncomeSources(String jwtToken) {
		User user = expenseServiceUtils.getUserByToken(jwtToken);
		return monthlyIncomeRepository.findByUserId(user.getUserId());
	}

	@Transactional
	public void removeMonthlyIncome(int id) {
		monthlyIncomeRepository.deleteById(id);
	}
}
