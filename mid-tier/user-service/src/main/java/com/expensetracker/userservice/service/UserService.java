package com.expensetracker.userservice.service;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.userservice.constants.ErrorMessages;
import com.expensetracker.userservice.constants.SuccessMessages;
import com.expensetracker.userservice.dao.MonthlyBillReminderDao;
import com.expensetracker.userservice.dao.MonthlyIncomeSourceDao;
import com.expensetracker.userservice.dao.UserDao;
import com.expensetracker.userservice.dto.UserRequest;
import com.expensetracker.userservice.dto.UserResponse;
import com.expensetracker.userservice.dto.UserUpdateDetails;
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

	public UserResponse createUser(UserRequest userRequestDto) {
		UserResponse response;
		try {
			User user = userRequestDto.getUser();
			UUID uuid = UUID.randomUUID();
			user.setUserId(uuid.toString().replaceAll("-", ""));
			userDao.createUser(user);
			userRequestDto.getIncomeSources().forEach(incomeSource -> {
				incomeSource.setUser(user);
				incomeSourceDao.addIncomeSource(incomeSource);
			});
			userRequestDto.getBillReminders().forEach(billReminder -> {
				billReminder.setUser(user);
				billReminderDao.addBillReminder(billReminder);
			});
			response = new UserResponse(true, SuccessMessages.USER_CREATED);
		} catch (UserServiceException userServiceException) {
			response = new UserResponse(false, ErrorMessages.USER_EXISTS);
		}
		return response;
	}

	public UserResponse updateUser(UserUpdateDetails userUpdateDetails) {
		userDao.updateUser(userUpdateDetails);
		UserResponse response = new UserResponse(true, SuccessMessages.USER_UPDATED);
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

	public UserUpdateDetails getUserUpdateDetails(String jwtToken) {
		UserUpdateDetails updateDetails = new UserUpdateDetails();
		User user = getUserByToken(jwtToken);
		if (user == null) {
			return null;
		}
		updateDetails.setFirstName(user.getFirstName());
		updateDetails.setLastName(user.getLastName());
		updateDetails.setCurrency(user.getCurrency());
		updateDetails.setDateOfBirth(user.getDateOfBirth());
		updateDetails.setEmail(user.getEmail());
		updateDetails.setPhoneNumber(user.getPhoneNumber());
		return updateDetails;
	}
}
