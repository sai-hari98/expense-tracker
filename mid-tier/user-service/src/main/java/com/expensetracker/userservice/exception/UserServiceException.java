package com.expensetracker.userservice.exception;

public class UserServiceException extends Exception {

	private static final long serialVersionUID = 1L;

	private String message;

	public UserServiceException() {
		super();
	}

	public UserServiceException(String message) {
		super(message);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
