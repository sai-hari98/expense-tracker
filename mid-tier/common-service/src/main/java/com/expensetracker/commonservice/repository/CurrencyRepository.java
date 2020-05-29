package com.expensetracker.commonservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.commonservice.entity.Currency;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Integer> {

}
