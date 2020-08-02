package com.expensetracker.userservice.dto;

public class UserResponse {

	private boolean status;
	
	private String message;
	
	public UserResponse() {
		super();
	}

	public UserResponse(boolean status, String message) {
		super();
		this.status = status;
		this.message = message;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
		
}
