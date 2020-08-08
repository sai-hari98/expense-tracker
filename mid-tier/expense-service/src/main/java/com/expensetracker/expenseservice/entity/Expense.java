package com.expensetracker.expenseservice.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="expense")
public class Expense {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Min(1)
	@Column(name="amount")
	private int amount;
	
	@NotNull(message="Expense description cannot be null")
	@Size(min = 1, max= 100, message="Expense Description should be of 1 to 100 characters long")
	@Column(name="expense_desc")
	private String description;
	
	@ManyToOne
	@JoinColumn(name="expense_category_id")
	@Valid
	private ExpenseCategory expenseCategory;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	@Valid
	@JsonIgnore
	private User user;
	
	@NotNull(message="Date cannot be null")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private Date date;

	public Expense() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Expense(int id, @Min(1) int amount,
			@NotNull(message = "Expense description cannot be null") @Size(min = 1, max = 100, message = "Expense Description should be of 1 to 100 characters long") String description,
			@Valid ExpenseCategory expenseCategory, @Valid User user, @NotNull Date date) {
		super();
		this.id = id;
		this.amount = amount;
		this.description = description;
		this.expenseCategory = expenseCategory;
		this.user = user;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ExpenseCategory getExpenseCategory() {
		return expenseCategory;
	}

	public void setExpenseCategory(ExpenseCategory expenseCategory) {
		this.expenseCategory = expenseCategory;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
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
		Expense other = (Expense) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
