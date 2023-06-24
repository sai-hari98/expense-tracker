package com.expensetracker.expenseservice.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "transaction-type")
@Data
public class TransactionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;
}
