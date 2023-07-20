package com.expensetracker.expenseservice.service;

import com.expensetracker.expenseservice.entity.Transaction;
import com.expensetracker.expenseservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Service
public class TransactionService {

    private static final String GOOGLE_SHEETS_FETCH_API = "/v4/spreadsheets/%s/values/%s!A1:Z3000";

    private static final SimpleDateFormat monthStringFormat = new SimpleDateFormat("MMMM");

    @Autowired
    private TransactionRepository transactionRepository;

    @Resource(name = "googleSheetsRestTemplate")
    @Autowired
    private RestTemplate googleSheetsRestTemplate;

    public void addTransaction(Transaction transaction){
        transactionRepository.save(transaction);
    }

    public String fetchTransactionsFromGoogleSheets(String spreadSheetID){
        String formattedUrl = String.format(GOOGLE_SHEETS_FETCH_API, spreadSheetID
                , monthStringFormat.format(Date.from(Instant.now())));
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-goog-api-key", "AIzaSyDBLcj3um5YbqpSDjlxSyOuoqbdTPw6xvc");
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        return googleSheetsRestTemplate.exchange(formattedUrl, HttpMethod.GET, requestEntity, String.class).getBody();
    }
}
