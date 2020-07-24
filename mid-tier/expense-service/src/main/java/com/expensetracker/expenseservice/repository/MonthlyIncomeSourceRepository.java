package com.expensetracker.expenseservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.expenseservice.entity.MonthlyIncomeSource;

@Repository
public interface MonthlyIncomeSourceRepository extends JpaRepository<MonthlyIncomeSource, Integer> {

}
