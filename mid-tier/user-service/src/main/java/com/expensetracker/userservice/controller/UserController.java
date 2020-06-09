package com.expensetracker.userservice.controller;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.userservice.dto.UserSignupRequestDto;
import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.service.UserService;

@RequestMapping("/users")
@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public Map<String, Object> createUser(@RequestBody @Valid UserSignupRequestDto userSignupRequestDto) {
		return userService.createUser(userSignupRequestDto);
	}

	@GetMapping("/{email}")
	public User getUserByEmail(@PathVariable(name = "email") String email) {
		return userService.getUserByEmail(email);
	}
}
