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

@Entity
@Table(name="income")
public class Income {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name ="user_id")
	private User user;
	
	@Column(name="income_desc")
	private String incomeDescription;
	
	@Column(name="date")
	private Date date;
	
	@Column(name="amount")
	private int amount;
	
	@ManyToOne
	@JoinColumn(name = "income_category_id")
	private IncomeCategory incomeCategory;

	public Income() {
		super();
	}

	public Income(int id, User user, String incomeDescription, Date date, int amount, IncomeCategory incomeCategory) {
		super();
		this.id = id;
		this.user = user;
		this.incomeDescription = incomeDescription;
		this.date = date;
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

	public String getIncomeDescription() {
		return incomeDescription;
	}

	public void setIncomeDescription(String incomeDescription) {
		this.incomeDescription = incomeDescription;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
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
		Income other = (Income) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Income [id=" + id + ", incomeDescription=" + incomeDescription + ", date=" + date + ", amount=" + amount
				+ "]";
	}
	
}
