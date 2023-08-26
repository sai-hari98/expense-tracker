package com.expensetracker.expenseservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties
public class SheetMetaData {

    private String sheetId;
    private String title;
}
