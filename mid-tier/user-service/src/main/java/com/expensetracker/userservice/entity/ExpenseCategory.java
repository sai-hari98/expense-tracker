package com.expensetracker.userservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="expense_category")
public class ExpenseCategory {

	@Id
	@Column(name="id")
	private int id;
	
	@Column(name="category_name")
	private String categoryName;

	public ExpenseCategory() {
		super();
	}

	public ExpenseCategory(int id, String categoryName) {
		super();
		this.id = id;
		this.categoryName = categoryName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
}
