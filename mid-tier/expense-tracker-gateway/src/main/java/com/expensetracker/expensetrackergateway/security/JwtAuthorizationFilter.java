package com.expensetracker.expensetrackergateway.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.expensetracker.expensetrackergateway.client.UserServiceClient;
import com.expensetracker.expensetrackergateway.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

/**
 * @author 805831
 *
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

	private Logger LOGGER = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

	@Autowired
	private UserServiceClient userService;

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		//set to null because each request should be authenticated
		//if the first request to zuul is authenticated and subsequent requests are not authenticated they are being allowed to pass
		SecurityContextHolder.getContext().setAuthentication(null);
		if (userService == null) {
			ServletContext servletContext = req.getServletContext();
			WebApplicationContext webApplicationContext = WebApplicationContextUtils
					.getWebApplicationContext(servletContext);
			userService = webApplicationContext.getBean(UserServiceClient.class);
		}
		String header = req.getHeader("Authorization");
		LOGGER.info("Auth Header: " + header);
		if (header == null || !header.startsWith("Bearer ")) {
			LOGGER.info("UnAuthenticated");
			chain.doFilter(req, res);
			return;
		}
		LOGGER.info("Authenticated");
		UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
		LOGGER.info("" + authentication);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		LOGGER.info("Token: " + token);
		if (token != null) {
			// parse the token.
			Jws<Claims> jws;
			try {
				jws = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token.replace("Bearer ", ""));
				LOGGER.info("Jws Body: " + jws.getBody().toString());
				String email = jws.getBody().getSubject();
				LOGGER.info("Email: " + email);
				if (email != null) {
					User user = userService.getUserByEmail(email);
					LOGGER.info("First Name: " + user.getFirstName());
					if (user != null) {
						return new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());
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
}
