package com.expensetracker.userservice.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.userservice.dto.UserRequest;
import com.expensetracker.userservice.dto.UserResponse;
import com.expensetracker.userservice.dto.UserUpdateDetails;
import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.service.UserService;

@RequestMapping("/users")
@RestController
public class UserController {

	public static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public UserResponse createUser(@RequestBody @Valid UserRequest userRequestDto) {
		return userService.createUser(userRequestDto);
	}

	@PutMapping("/update")
	public UserResponse updateUser(@RequestBody @Valid UserUpdateDetails userUpdateDetails) {
		return userService.updateUser(userUpdateDetails);
	}

	@GetMapping("/{email:.+}")
	public User getUserByEmail(@PathVariable(name = "email") String email) {
		LOGGER.info("Email: " + email);
		User user = userService.getUserByEmail(email);
		return user;
	}

	@GetMapping("/userId/{userId}")
	public User getUserByUserId(@PathVariable(name = "userId") String userId) {
		return userService.getUserByUserId(userId);
	}

	@GetMapping("/token")
	public User getUserByToken(@RequestHeader(name = "jwt") String jwtToken) {
		LOGGER.info("Token is: " + jwtToken);
		return userService.getUserByToken(jwtToken);
	}

	@GetMapping("/get")
	public UserUpdateDetails getUser(@RequestHeader(name = "Authorization") String authHeader) {
		return userService.getUserUpdateDetails(authHeader.replace("Bearer ", ""));
	}
}
