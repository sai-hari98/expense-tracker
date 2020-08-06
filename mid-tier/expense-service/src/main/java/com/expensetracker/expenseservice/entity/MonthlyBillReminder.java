package com.expensetracker.expenseservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

@Entity
@Table(name = "monthly_bill_reminder")
public class MonthlyBillReminder {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "bill_desc")
	@Size(min = 1, max = 100, message = "billDescription must be of 1 to 100 characters")
	private String billDescription;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@NotNull
	@JoinColumn(name = "expense_category_id")
	private ExpenseCategory expenseCategory;

	@Column(name = "amount")
	@JoinColumn(name = "amount")
	@Min(value = 1, message = "Amount should be greater than 0")
	private int amount;

	@Column(name = "paid")
	private boolean paid = false;

	@Column(name = "deadline_date")
	@Min(value = 1, message = "Deadline date should have 1 as minimum")
	@Max(value = 30, message = "Deadline date should have 30 as max value")
	private int deadlineDate;

	public MonthlyBillReminder() {
		super();
	}

	public MonthlyBillReminder(int id, String billDescription, User user, ExpenseCategory expenseCategory, int amount,
			boolean paid, int deadlineDate) {
		super();
		this.id = id;
		this.billDescription = billDescription;
		this.user = user;
		this.expenseCategory = expenseCategory;
		this.amount = amount;
		this.paid = paid;
		this.deadlineDate = deadlineDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBillDescription() {
		return billDescription;
	}

	public void setBillDescription(String billDescription) {
		this.billDescription = billDescription;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ExpenseCategory getExpenseCategory() {
		return expenseCategory;
	}

	public void setExpenseCategory(ExpenseCategory expenseCategory) {
		this.expenseCategory = expenseCategory;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	public int getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(int deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MonthlyBillReminder other = (MonthlyBillReminder) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
