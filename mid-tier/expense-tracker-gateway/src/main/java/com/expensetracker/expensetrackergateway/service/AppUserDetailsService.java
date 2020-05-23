package com.expensetracker.expensetrackergateway.service;

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

	@Autowired
	private UserServiceClient userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("Username "+username);
		User user = userService.getUserByEmail(username);
		if (user == null) {
			System.out.println("User not received");
			throw new UsernameNotFoundException("User not found");
		}
		System.out.println(user.toString());
		return new AppUserDetails(user);
	}

}
