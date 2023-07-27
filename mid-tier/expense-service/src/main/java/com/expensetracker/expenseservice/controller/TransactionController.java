package com.expensetracker.expenseservice.controller;

import com.expensetracker.expenseservice.entity.GoogleSheetsValues;
import com.expensetracker.expenseservice.entity.Transaction;
import com.expensetracker.expenseservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @PostMapping
    public ResponseEntity addTransaction(
            @Valid Transaction transaction,
            HttpServletRequest httpServletRequest){
        transactionService.addTransaction(transaction);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{spreadsheetID}")
    public GoogleSheetsValues getTransactions(@PathVariable(name = "spreadsheetID") String spreadsheetID){
        return transactionService.fetchTransactionsFromGoogleSheets(spreadsheetID);
    }
}
