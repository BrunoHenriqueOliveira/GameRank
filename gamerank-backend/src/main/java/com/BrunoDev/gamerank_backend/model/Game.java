package com.BrunoDev.gamerank_backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "games")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {
    @Id
    private String id;
    private String title;
    private String genre;
    private String developer;
    private List<Review> reviews;
}
