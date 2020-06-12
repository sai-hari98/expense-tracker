package com.expensetracker.expensetrackergateway.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.expensetracker.expensetrackergateway.entity.User;

@FeignClient(name = "user-service", url = "http://localhost:8080")
public interface UserServiceClient {

	@GetMapping("/users/{email}/")
	public User getUserByEmail(@PathVariable(value = "email") String email);

	@GetMapping("/users/userId/{userId}")
	public User getUserByUserId(@PathVariable(value = "userId") String userId);

}
