package com.expensetracker.userservice.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.expensetracker.userservice.constants.ErrorMessages;
import com.expensetracker.userservice.constants.SuccessMessages;
import com.expensetracker.userservice.dao.MonthlyBillReminderDao;
import com.expensetracker.userservice.dao.MonthlyIncomeSourceDao;
import com.expensetracker.userservice.dao.UserDao;
import com.expensetracker.userservice.dto.UserSignupRequestDto;
import com.expensetracker.userservice.entity.User;
import com.expensetracker.userservice.exception.UserServiceException;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private MonthlyIncomeSourceDao incomeSourceDao;

	@Autowired
	private MonthlyBillReminderDao billReminderDao;

	public Map<String, Object> createUser(UserSignupRequestDto userSignupRequestDto) {
		Map<String, Object> response = new HashMap<>();
		try {
			User user = userSignupRequestDto.getUser();
			UUID uuid = UUID.randomUUID();
			user.setUserId(uuid.toString().replaceAll("-", ""));
			userDao.createUser(user);
			userSignupRequestDto.getIncomeSources().forEach(incomeSource -> {
				incomeSource.setUser(user);
				incomeSourceDao.addIncomeSource(incomeSource);
			});
			userSignupRequestDto.getBillReminders().forEach(billReminder -> {
				billReminder.setUser(user);
				billReminderDao.addBillReminder(billReminder);
			});
			response.put("status", true);
			response.put("message", SuccessMessages.USER_CREATED);
		} catch (UserServiceException userServiceException) {
			response.put("status", false);
			response.put("message", ErrorMessages.USER_EXISTS);
		}
		return response;
	}

	public User getUserByEmail(String email) {
		return userDao.getUserByEmail(email);
	}

	public User getUserByUserId(String userId) {
		return userDao.getUserByUserId(userId);
	}

	@Bean
	private BCryptPasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
