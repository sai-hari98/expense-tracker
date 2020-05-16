package com.expensetracker.userservice.dto;

import com.expensetracker.userservice.entity.Currency;
import com.expensetracker.userservice.entity.User;

public class UserDto {

	private User user;
	private Currency currency;

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
}
