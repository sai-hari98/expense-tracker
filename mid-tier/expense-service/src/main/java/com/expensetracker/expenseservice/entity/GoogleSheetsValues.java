package com.expensetracker.expenseservice.entity;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
public class GoogleSheetsValues {

    private String range;
    private String majorDimension;
    private List<List<String>> values;
}
