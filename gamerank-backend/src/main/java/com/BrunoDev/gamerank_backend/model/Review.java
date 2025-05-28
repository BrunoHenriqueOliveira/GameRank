package com.BrunoDev.gamerank_backend.model;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    private String userId;
    private String comment;
    private int rating;
    private LocalDate date;
}
