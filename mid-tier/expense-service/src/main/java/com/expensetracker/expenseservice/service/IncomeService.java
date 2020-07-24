package com.expensetracker.expenseservice.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.expensetracker.expenseservice.dto.AddIncomeRequestDto;
import com.expensetracker.expenseservice.entity.Income;
import com.expensetracker.expenseservice.entity.User;
import com.expensetracker.expenseservice.repository.IncomeRepository;
import com.expensetracker.expenseservice.dto.MonthlyIncomeRequest;
import com.expensetracker.expenseservice.entity.MonthlyIncomeSource;
import com.expensetracker.expenseservice.repository.MonthlyIncomeSourceRepository;

@Service
public class IncomeService {

	@Autowired
	private IncomeRepository incomeRepository;

	@Autowired
	private MonthlyIncomeSourceRepository monthlyIncomeRepository;

	@Value("${user.getbyToken}")
	private String getUserUrl;
	
	@Autowired
	private RestTemplate restTemplate;

	@Transactional
	public void addIncomeForUser(AddIncomeRequestDto incomeRequest, String jwtToken) {
		Income income = new Income();
		income.setIncomeCategory(incomeRequest.getIncomeCategory());
		income.setIncomeDescription(incomeRequest.getDescription());
		income.setDate(incomeRequest.getDate());
		income.setAmount(incomeRequest.getAmount());
		HttpHeaders headers = new HttpHeaders();
		headers.set("jwt", jwtToken);
		HttpEntity<?> entity = new HttpEntity<Object>(headers);
		ResponseEntity<User> response = restTemplate.exchange(getUserUrl, HttpMethod.GET, entity, User.class);
		User user = response.getBody();
		income.setUser(user);
		incomeRepository.save(income);
	}

	@Transactional
	public void addMonthlyIncomeForUser(MonthlyIncomeRequest monthlyIncomeRequest, String jwtToken) {
		MonthlyIncomeSource monthlyIncome = new MonthlyIncomeSource();
		monthlyIncome.setSourceName(monthlyIncomeRequest.getSourceName());
		monthlyIncome.setIncomeCategory(monthlyIncomeRequest.getIncomeCategory());
		monthlyIncome.setAmount(monthlyIncomeRequest.getAmount());
		User user = getUserByToken(jwtToken);
		monthlyIncome.setUser(user);
		monthlyIncomeRepository.save(monthlyIncome);
	}

	private User getUserByToken(String jwtToken) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("jwt", jwtToken);
		HttpEntity<?> entity = new HttpEntity<Object>(headers);
		ResponseEntity<User> response = restTemplate.exchange(getUserUrl, HttpMethod.GET, entity, User.class);
		return response.getBody();
	}
}
