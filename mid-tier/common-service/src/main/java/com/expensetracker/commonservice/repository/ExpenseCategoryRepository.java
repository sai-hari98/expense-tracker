package com.expensetracker.commonservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensetracker.commonservice.entity.ExpenseCategory;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Integer> {

}
