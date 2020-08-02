package com.expensetracker.userservice.dto;

import java.util.Date;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.expensetracker.userservice.entity.Currency;
import com.fasterxml.jackson.annotation.JsonFormat;

public class UserUpdateDetails {

	@NotNull
	private String firstName;
	@NotNull
	private String lastName;
	@NotNull
	@JsonFormat(pattern = "dd/MM/yyyy", shape = JsonFormat.Shape.STRING)
	private Date dateOfBirth;
	@NotNull
	@Valid
	private Currency currency;
	@NotNull
	@Pattern(regexp="(^$|[0-9]{10})", message = "Phone Number should be of 10 numbers")
	private String phoneNumber;
	@Email(message = "Email is invalid")
	@NotNull
	private String email;

	public UserUpdateDetails() {
		super();
	}

	public UserUpdateDetails(String firstName, String lastName, Date dateOfBirth, Currency currency, String phoneNumber,
			String email) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.currency = currency;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
