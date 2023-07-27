package com.expensetracker.expenseservice.service;

import com.expensetracker.expenseservice.entity.GoogleSheetsValues;
import com.expensetracker.expenseservice.entity.Transaction;
import com.expensetracker.expenseservice.repository.TransactionRepository;
import com.expensetracker.expenseservice.utility.AWSUtility;
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

    @Autowired
    private AWSUtility awsUtility;

    public void addTransaction(Transaction transaction){
        transactionRepository.save(transaction);
    }

    public void saveTransactionsOfCurrentMonthFromGoogleSheets(String spreadsheetID){
        GoogleSheetsValues values = fetchTransactionsFromGoogleSheetsForMonth(spreadsheetID, monthStringFormat.format(Date.from(Instant.now())));
    }

    public GoogleSheetsValues fetchTransactionsFromGoogleSheetsForMonth(String spreadSheetID, String month){
        String formattedUrl = String.format(GOOGLE_SHEETS_FETCH_API, spreadSheetID, month);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-goog-api-key", awsUtility.getSecretValue("google-sheets-api-key"));
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
        return googleSheetsRestTemplate.exchange(formattedUrl, HttpMethod.GET, requestEntity, GoogleSheetsValues.class).getBody();
    }
}
