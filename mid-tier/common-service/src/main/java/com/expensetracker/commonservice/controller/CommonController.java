package com.expensetracker.commonservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.commonservice.entity.Currency;
import com.expensetracker.commonservice.service.CommonService;

@RestController
public class CommonController {

	@Autowired
	private CommonService commonService;
	
	@GetMapping("/currency")
	public List<Currency> getAllCurrencies(){
		return commonService.getAllCurrencies(); 
	}
}
