package com.expensetracker.expenseservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "currency")
public class Currency {

	@NotNull
	@Id
	@Column(name = "id")
	private int id;

	@NotNull
	@Column(name = "currency_name")
	private String currencyName;

	public Currency() {
		super();
	}

	public Currency(int id, String currencyName) {
		super();
		this.id = id;
		this.currencyName = currencyName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCurrencyName() {
		return currencyName;
	}

	public void setCurrencyName(String currencyName) {
		this.currencyName = currencyName;
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
		Currency other = (Currency) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Currency [id=" + id + ", currencyName=" + currencyName + "]";
	}

}
