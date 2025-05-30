package com.BrunoDev.gamerank_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;
    private String gameId;
    private String author;
    private String content;
    private int rating;
    private LocalDate date;
}
