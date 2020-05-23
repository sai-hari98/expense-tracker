package com.expensetracker.userservice.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public Map<String, Object> createUser(User user) {
		Map<String, Object> response = new HashMap<>();
		if (getUserByEmail(user.getEmail()) == null) {
			UUID uuid = UUID.randomUUID();
			user.setUserId(uuid.toString().replaceAll("-", ""));
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			response.put("status", true);
			response.put("message", "User Created Successfully");
		} else {
			response.put("status", false);
			response.put("message", "User already exist");
		}
		return response;
	}

	@Transactional
	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
}
