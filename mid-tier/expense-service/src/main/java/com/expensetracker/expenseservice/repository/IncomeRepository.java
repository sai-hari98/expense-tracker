package com.expensetracker.expenseservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.expenseservice.entity.Income;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Integer> {

}
