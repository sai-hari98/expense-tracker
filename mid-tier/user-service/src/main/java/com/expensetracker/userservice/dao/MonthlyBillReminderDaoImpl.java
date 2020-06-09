package com.expensetracker.userservice.dao;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.expensetracker.userservice.entity.MonthlyBillReminder;
import com.expensetracker.userservice.repository.MonthlyBillReminderRepository;

@Component
public class MonthlyBillReminderDaoImpl implements MonthlyBillReminderDao {

	@Autowired
	private MonthlyBillReminderRepository billReminderRepository;
	
	@Override
	@Transactional
	public void addBillReminder(MonthlyBillReminder billReminder) {
		billReminderRepository.save(billReminder);
	}

}
