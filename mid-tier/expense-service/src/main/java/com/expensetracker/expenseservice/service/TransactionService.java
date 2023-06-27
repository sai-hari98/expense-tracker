package com.expensetracker.expenseservice.service;

import com.expensetracker.expenseservice.entity.Transaction;
import com.expensetracker.expenseservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    public void addTransaction(Transaction transaction){
        transactionRepository.save(transaction);
    }
}
