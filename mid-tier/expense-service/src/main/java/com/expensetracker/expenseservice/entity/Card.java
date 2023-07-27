package com.expensetracker.expenseservice.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "card_name")
    private String cardName;
}
