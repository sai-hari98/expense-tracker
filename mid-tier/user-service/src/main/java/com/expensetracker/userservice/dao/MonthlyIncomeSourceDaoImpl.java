package com.expensetracker.userservice.dao;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.expensetracker.userservice.entity.MonthlyIncomeSource;
import com.expensetracker.userservice.repository.MonthlyIncomeSourceRepository;

@Component
public class MonthlyIncomeSourceDaoImpl implements MonthlyIncomeSourceDao {

	@Autowired
	private MonthlyIncomeSourceRepository incomeSourceRepository;
	
	@Override
	@Transactional
	public void addIncomeSource(MonthlyIncomeSource incomeSource) {
		incomeSourceRepository.save(incomeSource);
	}

}
