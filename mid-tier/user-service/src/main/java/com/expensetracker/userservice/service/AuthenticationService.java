package com.expensetracker.userservice.service;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.expensetracker.userservice.entity.User;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthenticationService {

	@Autowired
	private UserService userService;

	public Map<String, Object> authenticate(String authorization) {
		String credentials = getCredentials(authorization);
		String email = credentials.split(":")[0];
		Map<String, Object> jwt = new HashMap<>();
		User user = userService.getUserByEmail(email);
		if (user != null) {
			jwt.put("status", true);
			jwt.put("token", generateJwt(email));
			jwt.put("userId", user.getUserId());
		} else {
			jwt.put("status", false);
			jwt.put("message", "User does not exist");
		}
		return jwt;
	}

	private String generateJwt(String user) {
		JwtBuilder builder = Jwts.builder();
		builder.setSubject(user);
		builder.setIssuedAt(new Date());
		builder.setExpiration(new Date(new Date().getTime() + 1200000));
//		SecretKey keys = Keys.hmacShaKeyFor("jwtsecretkeyforexpensetrackerapplicationauthorization".getBytes(StandardCharsets.UTF_8));
//		builder.signWith(keys, SignatureAlgorithm.HS256);
		builder.signWith(SignatureAlgorithm.HS256, "secretkey");
		return builder.compact();
	}

	@Bean
	private BCryptPasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	private String getCredentials(String header) {
		String encryptedCredentials = header.split(" ")[1];
		byte[] decodedCredentialBytes = Base64.getDecoder().decode(encryptedCredentials);
		String decodedCredentials = new String(decodedCredentialBytes);
		return decodedCredentials;
	}

}
