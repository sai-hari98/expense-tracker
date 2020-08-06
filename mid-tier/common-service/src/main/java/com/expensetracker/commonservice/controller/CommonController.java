package com.expensetracker.commonservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.commonservice.entity.IncomeCategory;
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

	@GetMapping("/categories")
	public Map<String, Object> getIncomeExpenseCategories() {
		Map<String, Object> categoryData = new HashMap<>();
		categoryData.put("incomeCategories", commonService.getAllIncomeCategories());
		categoryData.put("expenseCategories", commonService.getAllExpenseCategories());
		return categoryData;
	}

	@GetMapping("/income-category")
	public List<IncomeCategory> getIncomeCategories() {
		return commonService.getAllIncomeCategories();
	}

}
