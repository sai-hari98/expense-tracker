package com.expensetracker.userservice.dao;

import org.springframework.stereotype.Component;

import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.exception.UserServiceException;

@Component
public interface UserDao {

	public void createUser(User user) throws UserServiceException;
	
	public User getUserByEmail(String email);
}
