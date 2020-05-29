package com.expensetracker.commonservice.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.commonservice.entity.Currency;
import com.expensetracker.commonservice.repository.CurrencyRepository;

@Service
public class CommonService {

	@Autowired
	private CurrencyRepository currencyRepository;
	
	@Transactional
	public List<Currency> getAllCurrencies(){
		return currencyRepository.findAll();
	}
}
