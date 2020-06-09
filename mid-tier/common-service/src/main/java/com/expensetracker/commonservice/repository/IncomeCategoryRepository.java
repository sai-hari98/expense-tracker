package com.expensetracker.commonservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensetracker.commonservice.entity.IncomeCategory;

public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory, Integer> {

}
