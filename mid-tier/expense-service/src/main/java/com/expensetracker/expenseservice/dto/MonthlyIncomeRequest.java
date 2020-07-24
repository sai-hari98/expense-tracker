package com.expensetracker.expenseservice.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.expensetracker.expenseservice.entity.IncomeCategory;

public class MonthlyIncomeRequest {

	@Size(min = 1, max = 100, message = "Source name is mandatory and should be of 100 characters")
	private String sourceName;

	@NotNull(message = "Amount is mandatory")
	private int amount;

	@NotNull(message = "Income Category is mandatory")
	private IncomeCategory incomeCategory;

	public MonthlyIncomeRequest() {
		super();
	}

	public MonthlyIncomeRequest(
			@Size(min = 1, max = 100, message = "Source name is mandatory and should be of 100 characters") String sourceName,
			@NotNull(message = "Amount is mandatory") int amount,
			@NotNull(message = "Income Category is mandatory") IncomeCategory incomeCategory) {
		super();
		this.sourceName = sourceName;
		this.amount = amount;
		this.incomeCategory = incomeCategory;
	}

	public String getSourceName() {
		return sourceName;
	}

	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public IncomeCategory getIncomeCategory() {
		return incomeCategory;
	}

	public void setIncomeCategory(IncomeCategory incomeCategory) {
		this.incomeCategory = incomeCategory;
	}

}
