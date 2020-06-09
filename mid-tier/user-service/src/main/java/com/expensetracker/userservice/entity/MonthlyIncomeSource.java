package com.expensetracker.userservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import com.sun.istack.NotNull;

@Entity
@Table(name = "monthly_income_source")
public class MonthlyIncomeSource {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "source_name")
	@Size(min = 1, max = 100, message = "Source name must be of 1 to 100 characters")
	private String sourceName;

	@Column(name = "amount")
	@Min(value = 1, message = "Amount should be greater than 0")
	private int amount;

	@ManyToOne
	@NotNull
	@JoinColumn(name = "income_category_id")
	private IncomeCategory incomeCategory;

	public MonthlyIncomeSource() {
		super();
	}

	public MonthlyIncomeSource(int id, User user, String sourceName, int amount, IncomeCategory incomeCategory) {
		super();
		this.id = id;
		this.user = user;
		this.sourceName = sourceName;
		this.amount = amount;
		this.incomeCategory = incomeCategory;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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
		MonthlyIncomeSource other = (MonthlyIncomeSource) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
