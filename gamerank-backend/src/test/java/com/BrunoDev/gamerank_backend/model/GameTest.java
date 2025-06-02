package com.BrunoDev.gamerank_backend.model;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat; // Usando AssertJ para asserções mais legíveis
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class GameTest {

    @Test
    void testGameCreationAndGettersSetters() {
        // Dados de exemplo para uma review
        Review review1 = Review.builder()
                .rating(5)
                .build();

        Review review2 = Review.builder()
                .rating(4)
                .build();

        List<Review> reviews = Arrays.asList(review1, review2);

        // Criação do objeto Game usando o Builder do Lombok
        Game game = Game.builder()
                .id("12345")
                .title("The Witcher 3")
                .genre("RPG")
                .developer("CD Projekt Red")
                .reviews(reviews)
                .build();

        // Verificando se os valores foram setados corretamente e se os getters funcionam
        assertThat(game.getId()).isEqualTo("12345");
        assertThat(game.getTitle()).isEqualTo("The Witcher 3");
        assertThat(game.getGenre()).isEqualTo("RPG");
        assertThat(game.getDeveloper()).isEqualTo("CD Projekt Red");
        assertThat(game.getReviews()).isEqualTo(reviews);
        assertThat(game.getReviews()).hasSize(2);
        assertThat(game.getReviews().get(0).getRating()).isEqualTo(5);
    }

    @Test
    void testNoArgsConstructor() {
        Game game = new Game();
        assertThat(game).isNotNull();
        assertThat(game.getId()).isNull(); // Valores padrão para String, List, etc.
        assertThat(game.getTitle()).isNull();
        assertThat(game.getReviews()).isNull();
    }

    @Test
    void testAllArgsConstructor() {
        List<Review> reviews = Arrays.asList(Review.builder().rating(5).build());
        Game game = new Game("67890", "Cyberpunk 2077", "RPG", "CD Projekt Red", reviews);

        assertThat(game.getId()).isEqualTo("67890");
        assertThat(game.getTitle()).isEqualTo("Cyberpunk 2077");
        assertThat(game.getReviews()).hasSize(1);
    }
}