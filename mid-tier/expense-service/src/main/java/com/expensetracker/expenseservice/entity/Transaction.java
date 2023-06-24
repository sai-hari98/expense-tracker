package com.expensetracker.expenseservice.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionID;
    private Currency currency;
    private TransactionType type;
    private double amount;
    private TransactionCategory category;
    private PaymentMethod paymentMethod;
    private Card card;
    private String remarks;
}
