package com.expensetracker.commonservice.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.commonservice.service.CommonService;

@RestController
public class CommonController {

	@Autowired
	private CommonService commonService;

	@GetMapping("/signup/data")
	public Map<String, Object> getSignupFormData() {
		Map<String, Object> signupFormData = new HashMap<>();
		signupFormData.put("currencyArray", commonService.getAllCurrencies());
		signupFormData.put("incomeCategories", commonService.getAllIncomeCategories());
		signupFormData.put("expenseCategories", commonService.getAllExpenseCategories());
		return signupFormData;
	}
	
}
