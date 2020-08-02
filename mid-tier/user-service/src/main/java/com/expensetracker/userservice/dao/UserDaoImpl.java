package com.expensetracker.userservice.dao;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.expensetracker.userservice.constants.ErrorMessages;
import com.expensetracker.userservice.dto.UserUpdateDetails;
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

	@Override
	public User getUserByUserId(String userId) {
		Optional<User> result = userRepository.findById(userId);
		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	@Override
	public void updateUser(UserUpdateDetails userUpdateDetails) {
		User user = getUserByEmail(userUpdateDetails.getEmail());
		user.setFirstName(userUpdateDetails.getFirstName());
		user.setLastName(userUpdateDetails.getLastName());
		user.setEmail(userUpdateDetails.getEmail());
		user.setPhoneNumber(userUpdateDetails.getPhoneNumber());
		userRepository.save(user);
	}
}
