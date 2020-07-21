package com.expensetracker.userservice.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Service
public class UserService {

	private static Logger LOGGER = LoggerFactory.getLogger(UserService.class);
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
	
	public User getUserByToken(String jwtToken) {
		if (jwtToken != null) {
			// parse the token.
			Jws<Claims> jws;
			try {
				jws = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(jwtToken);
				LOGGER.info("Jws Body: " + jws.getBody().toString());
				String userId = jws.getBody().getSubject();
				LOGGER.info("UserId: " + userId);
				if (userId != null) {
					User user = getUserByUserId(userId);
					if (user != null) {
						return user;
					}
				}
			} catch (JwtException | NullPointerException ex) {
				LOGGER.info("Exception while parsing JWT :" + ex.getMessage());
				return null;
			}
			return null;
		}
		return null;
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
