package com.expensetracker.expenseservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.expensetracker.expenseservice.entity.MonthlyBillReminder;

public interface MonthlyBillReminderRepository extends JpaRepository<MonthlyBillReminder, Integer> {

	@Query("select b from MonthlyBillReminder b where b.user.userId = :userId")
	public List<MonthlyBillReminder> getMonthlyBillRemindersById(@Param(value = "userId") String userId);
}
