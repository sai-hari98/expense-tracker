package com.expensetracker.expenseservice.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "payment_method")
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;
}
