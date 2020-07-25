package com.expensetracker.expenseservice.dto;

import java.util.Date;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.expensetracker.expenseservice.entity.IncomeCategory;
import com.fasterxml.jackson.annotation.JsonFormat;

public class AddIncomeRequestDto {

	@Size(min = 1,max = 100, message = "Description is mandatory and should be within 100 characters")
	private String description;
	@Min(value = 1, message="Amount should be a positive value")
	private int amount;
	@Valid
	@NotNull(message = "Income Category cannot be null")
	private IncomeCategory incomeCategory;
	@NotNull(message = "Date cannot be null")
	@JsonFormat(pattern = "dd/MM/yyyy",shape = JsonFormat.Shape.STRING)
	private Date date;

	public AddIncomeRequestDto() {
		super();
	}

	public AddIncomeRequestDto(
			@Size(min = 1, max = 100, message = "Description is mandatory and should be within 100 characters") String description,
			@Min(value = 1, message = "Amount should be a positive value") int amount,
			@Valid @NotNull(message = "Income Category cannot be null") IncomeCategory incomeCategory,
			@NotNull(message = "Date cannot be null") Date date) {
		super();
		this.description = description;
		this.amount = amount;
		this.incomeCategory = incomeCategory;
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
