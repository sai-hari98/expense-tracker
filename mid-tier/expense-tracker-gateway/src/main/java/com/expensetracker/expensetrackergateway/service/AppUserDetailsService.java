package com.expensetracker.expensetrackergateway.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.expensetracker.expensetrackergateway.client.UserServiceClient;
import com.expensetracker.expensetrackergateway.entity.AppUserDetails;
import com.expensetracker.expensetrackergateway.entity.User;

@Service
public class AppUserDetailsService implements UserDetailsService {

	public static final Logger LOGGER = LoggerFactory.getLogger(AppUserDetailsService.class);

	@Autowired
	private UserServiceClient userService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		LOGGER.info("Email: " + email);
		User user = userService.getUserByEmail(email);
		if (user == null) {
			LOGGER.info("User not found");
			throw new UsernameNotFoundException("User not found");
		}
		return new AppUserDetails(user);
	}

}
