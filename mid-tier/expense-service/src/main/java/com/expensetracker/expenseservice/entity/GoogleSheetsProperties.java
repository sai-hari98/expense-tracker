package com.expensetracker.expenseservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

public class GoogleSheetsProperties {

    private String spreadsheetId;
    private List<SheetMetaData> sheets;
}
