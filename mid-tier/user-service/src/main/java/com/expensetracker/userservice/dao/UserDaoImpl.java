package com.expensetracker.userservice.dao;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.expensetracker.userservice.constants.ErrorMessages;
import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.exception.UserServiceException;
import com.expensetracker.userservice.repository.UserRepository;

@Component
public class UserDaoImpl implements UserDao {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	@Override
	@Transactional
	public void createUser(User user) throws UserServiceException {
		if (getUserByEmail(user.getEmail()) == null) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
		} else {
			throw new UserServiceException(ErrorMessages.USER_EXISTS);
		}
	}

	@Override
	@Transactional
	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

}
