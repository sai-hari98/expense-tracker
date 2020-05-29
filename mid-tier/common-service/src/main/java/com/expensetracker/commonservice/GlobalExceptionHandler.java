package com.expensetracker.commonservice;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders httpHeaders, HttpStatus httpStatus, WebRequest webRequest) {
		Map<String, Object> body = new HashMap<>();
		body.put("timestamp", new Date());
		body.put("status", httpStatus.value());
		body.put("error", "Bad Request");
		if (ex.getCause() instanceof InvalidFormatException) {
			final Throwable cause = ex.getCause() == null ? ex : ex.getCause();
			for (InvalidFormatException.Reference reference : ((InvalidFormatException) cause).getPath()) {
				body.put("message", "Incorrect format for field '" + reference.getFieldName() + "'");
			}
		}
		return new ResponseEntity<>(body, httpHeaders, httpStatus);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", new Date());
		body.put("status", status.value());
		List<String> errors = ex.getBindingResult().getFieldErrors().stream().map(x -> x.getField().toUpperCase()+" "+x.getDefaultMessage())
				.collect(Collectors.toList());
		body.put("errors", errors);
		return new ResponseEntity<>(body, headers, status);
	}
}
