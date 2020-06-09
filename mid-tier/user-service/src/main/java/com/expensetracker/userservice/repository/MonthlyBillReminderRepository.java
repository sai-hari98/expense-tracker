package com.expensetracker.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensetracker.userservice.entity.MonthlyBillReminder;

public interface MonthlyBillReminderRepository extends JpaRepository<MonthlyBillReminder, Integer> {

}
