package com.expensetracker.expenseservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensetracker.expenseservice.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

}
