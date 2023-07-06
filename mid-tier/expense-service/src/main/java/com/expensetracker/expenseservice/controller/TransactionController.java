package com.expensetracker.expenseservice.controller;

import com.expensetracker.expenseservice.entity.Transaction;
import com.expensetracker.expenseservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @PostMapping
    public ResponseEntity addTransaction(@Valid Transaction transaction){
        transactionService.addTransaction(transaction);
        return ResponseEntity.ok().build();
    }
}
