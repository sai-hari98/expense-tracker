package com.expensetracker.expenseservice.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.expensetracker.expenseservice.entity.User;

@Component
public class ExpenseServiceUtils {

	@Value("${user.getbyToken}")
	private String getUserUrl;
	
	@Autowired
	private RestTemplate restTemplate;
	
	public User getUserByToken(String jwtToken) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("jwt", jwtToken);
		HttpEntity<?> entity = new HttpEntity<Object>(headers);
		ResponseEntity<User> response = restTemplate.exchange(getUserUrl, HttpMethod.GET, entity, User.class);
		return response.getBody();
	}
	
}
