package com.expensetracker.commonservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Sairam
 *
 */
@Entity
@Table(name = "income_category")
public class IncomeCategory {

	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "category_name")
	private String categoryName;

	public IncomeCategory() {
		super();
	}

	public IncomeCategory(int id, String categoryName) {
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
