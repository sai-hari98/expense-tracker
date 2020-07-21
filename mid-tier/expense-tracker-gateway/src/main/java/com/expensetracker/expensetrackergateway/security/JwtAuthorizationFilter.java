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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.expensetracker.expensetrackergateway.constants.ExpenseTrackerGatewayConstants;
import com.expensetracker.expensetrackergateway.entity.User;

/**
 * @author 805831
 *
 */

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

	private Logger LOGGER = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

	private RestTemplate restTemplate;

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		// set to null because each request should be authenticated
		// if the first request to zuul is authenticated and subsequent requests are not
		// authenticated they are being allowed to pass
		SecurityContextHolder.getContext().setAuthentication(null);
		if (restTemplate == null) {
			ServletContext servletContext = req.getServletContext();
			WebApplicationContext webApplicationContext = WebApplicationContextUtils
					.getWebApplicationContext(servletContext);
			restTemplate = webApplicationContext.getBean(RestTemplate.class);
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
		if (authentication != null) {
			req.setAttribute("userId", authentication.getPrincipal());
		}
		LOGGER.info("" + authentication);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		LOGGER.info("Token: " + token);
		HttpHeaders headers = new HttpHeaders();
		headers.set("jwt", token.replace("Bearer ", ""));
		HttpEntity<?> entity = new HttpEntity<Object>(headers);
		LOGGER.info("Url: " + ExpenseTrackerGatewayConstants.USER_GET_BY_TOKEN_URL);
		ResponseEntity<User> response = restTemplate.exchange(ExpenseTrackerGatewayConstants.USER_GET_BY_TOKEN_URL,
				HttpMethod.GET, entity, User.class);
		User user = response.getBody();
		if (user != null) {
			return new UsernamePasswordAuthenticationToken(user.getUserId(), null, new ArrayList<>());
		}
		return null;
	}
}
