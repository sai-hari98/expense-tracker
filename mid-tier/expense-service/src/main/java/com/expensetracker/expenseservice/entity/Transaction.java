package com.expensetracker.expenseservice.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionID;

    /* commenting this for now.
    making it one currency for an user.
     */
    /*@ManyToOne
    @JoinColumn(name="currency_id")
    @NotNull
    private Currency currency;*/

    @ManyToOne
    @JoinColumn(name="type_id")
    @NotNull
    private TransactionType type;

    @Column(name = "amount")
    @NotNull
    private double amount;

    @ManyToOne
    @JoinColumn(name="category_id")
    @NotNull
    private TransactionCategory category;

    @ManyToOne
    @JoinColumn(name="payment_method_id")
    @NotNull
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name="card_id")
    @NotNull
    private Card card;

    @ManyToOne
    @JoinColumn(name="user_id")
    @NotNull
    private User user;

    @NotNull
    private String remarks;
}
