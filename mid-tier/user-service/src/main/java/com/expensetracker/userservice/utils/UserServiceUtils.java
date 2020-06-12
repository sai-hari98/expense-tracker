package com.expensetracker.userservice.utils;

import java.util.Base64;
import java.util.Date;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class UserServiceUtils {

	public static final String getCredentials(String header) {
		String encryptedCredentials = header.split(" ")[1];
		byte[] decodedCredentialBytes = Base64.getDecoder().decode(encryptedCredentials);
		String decodedCredentials = new String(decodedCredentialBytes);
		return decodedCredentials;
	}

	public static final String generateJwt(String userId) {
		JwtBuilder builder = Jwts.builder();
		builder.setSubject(userId);
		builder.setIssuedAt(new Date());
		builder.setExpiration(new Date(new Date().getTime() + 1200000));
//		SecretKey keys = Keys.hmacShaKeyFor("jwtsecretkeyforexpensetrackerapplicationauthorization".getBytes(StandardCharsets.UTF_8));
//		builder.signWith(keys, SignatureAlgorithm.HS256);
		builder.signWith(SignatureAlgorithm.HS256, "secretkey");
		return builder.compact();
	}

}
