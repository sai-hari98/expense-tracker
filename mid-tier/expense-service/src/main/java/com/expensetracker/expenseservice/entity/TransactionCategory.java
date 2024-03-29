package com.expensetracker.expenseservice.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "transaction-category")
public class TransactionCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;
}
