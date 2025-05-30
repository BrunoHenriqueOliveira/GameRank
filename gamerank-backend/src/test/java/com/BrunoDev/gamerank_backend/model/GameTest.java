package com.BrunoDev.gamerank_backend.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class GameTest {
//    @Test
//    void shouldCreateGameUsingBuilder() {
//        Review review1 = new Review("user1", " Ótimo jogo! ", 5, LocalDate.of(2024, 5, 10));
//        Review review2 = new Review("user2", " Muito bom ", 4, LocalDate.of(2024, 5, 12));
//
//        Game game = Game.builder()
//                .id("123")
//                .title("The Witcher 3")
//                .genre("RPG")
//                .developer("CD Projekt")
//                .reviews(List.of(review1, review2))
//                .build();
//
//        assertEquals("123", game.getId());
//        assertEquals("The Witcher 3", game.getTitle());
//        assertEquals("RPG", game.getGenre());
//        assertEquals("CD Projekt", game.getDeveloper());
//        assertNotNull(game.getReviews());
//        assertEquals(2, game.getReviews().size());
//        assertEquals("user1", game.getReviews().get(0).getUserId());
//    }

    @Test
    void shouldSetAndGetFieldsCorrectly() {
        Game game = new Game();
        game.setId("456");
        game.setTitle("Hollow Knight");
        game.setGenre("Metroidvania");
        game.setDeveloper("Team Cherry");

        assertEquals("456", game.getId());
        assertEquals("Hollow Knight", game.getTitle());
        assertEquals("Metroidvania", game.getGenre());
        assertEquals("Team Cherry", game.getDeveloper());
    }
}