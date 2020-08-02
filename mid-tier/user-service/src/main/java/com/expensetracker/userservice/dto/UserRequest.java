package com.expensetracker.userservice.dto;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.expensetracker.userservice.entity.Currency;
import com.expensetracker.userservice.entity.MonthlyBillReminder;
import com.expensetracker.userservice.entity.MonthlyIncomeSource;
import com.expensetracker.userservice.entity.User;

public class UserRequest {

	@NotNull(message="User object cannot be null")
	@Valid
	private User user;

	@NotNull(message="Currency object cannot be null")
	@Valid
	private Currency currency;

	@NotNull(message="Income Source List cannot be null")
	@Valid
	private List<MonthlyIncomeSource> incomeSources;

	@NotNull(message="Bill Reminder List cannot be null")
	@Valid
	private List<MonthlyBillReminder> billReminders;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public List<MonthlyIncomeSource> getIncomeSources() {
		return incomeSources;
	}

	public void setIncomeSources(List<MonthlyIncomeSource> incomeSources) {
		this.incomeSources = incomeSources;
	}

	public List<MonthlyBillReminder> getBillReminders() {
		return billReminders;
	}

	public void setBillReminders(List<MonthlyBillReminder> billReminders) {
		this.billReminders = billReminders;
	}

}
