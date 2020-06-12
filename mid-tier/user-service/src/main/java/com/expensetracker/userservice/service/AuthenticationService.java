package com.expensetracker.userservice.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.utils.UserServiceUtils;

@Service
public class AuthenticationService {

	@Autowired
	private UserService userService;

	public Map<String, Object> authenticate(String authorization) {
		String credentials = UserServiceUtils.getCredentials(authorization);
		String email = credentials.split(":")[0];
		Map<String, Object> jwt = new HashMap<>();
		User user = userService.getUserByEmail(email);
		if (user != null) {
			jwt.put("status", true);
			jwt.put("token", UserServiceUtils.generateJwt(user.getUserId()));
			jwt.put("userId", user.getUserId());
		} else {
			jwt.put("status", false);
			jwt.put("message", "User does not exist");
		}
		return jwt;
	}

}
