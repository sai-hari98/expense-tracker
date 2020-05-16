package com.expensetracker.userservice.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public void createUser(User user) {
		UUID uuid = UUID.randomUUID();
		user.setUserId(uuid.toString());
		userRepository.save(user);
	}
}
