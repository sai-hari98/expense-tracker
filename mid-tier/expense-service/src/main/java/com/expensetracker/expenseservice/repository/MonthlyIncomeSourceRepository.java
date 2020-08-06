package com.expensetracker.expenseservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.expensetracker.expenseservice.entity.MonthlyIncomeSource;

@Repository
public interface MonthlyIncomeSourceRepository extends JpaRepository<MonthlyIncomeSource, Integer> {

	@Query("select m from MonthlyIncomeSource m where m.user.userId = :userId")
	public List<MonthlyIncomeSource> findByUserId(@Param(value = "userId")String userId);
	
}
