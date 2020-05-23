package com.expensetracker.userservice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.userservice.service.AuthenticationService;

@RestController
public class AuthenticationController {

	@Autowired
	private AuthenticationService authenticationService;

	@GetMapping("/login")
	private Map<String, Object> authenticate(@RequestHeader("Authorization") String authorization) {
		return authenticationService.authenticate(authorization);
	}

}
