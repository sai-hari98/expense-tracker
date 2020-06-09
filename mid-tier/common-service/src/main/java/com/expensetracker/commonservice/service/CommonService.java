package com.expensetracker.commonservice.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.commonservice.entity.Currency;
import com.expensetracker.commonservice.entity.ExpenseCategory;
import com.expensetracker.commonservice.entity.IncomeCategory;
import com.expensetracker.commonservice.repository.CurrencyRepository;
import com.expensetracker.commonservice.repository.ExpenseCategoryRepository;
import com.expensetracker.commonservice.repository.IncomeCategoryRepository;

@Service
public class CommonService {

	@Autowired
	private CurrencyRepository currencyRepository;

	@Autowired
	private IncomeCategoryRepository incomeCategoryRepository;

	@Autowired
	private ExpenseCategoryRepository expenseCategoryRepository;

	@Transactional
	public List<Currency> getAllCurrencies() {
		return currencyRepository.findAll();
	}

	@Transactional
	public List<IncomeCategory> getAllIncomeCategories() {
		return incomeCategoryRepository.findAll();
	}

	@Transactional
	public List<ExpenseCategory> getAllExpenseCategories() {
		return expenseCategoryRepository.findAll();
	}
}
