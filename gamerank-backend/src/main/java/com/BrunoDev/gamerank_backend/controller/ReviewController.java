package com.BrunoDev.gamerank_backend.controller;

import com.BrunoDev.gamerank_backend.model.Review;
import com.BrunoDev.gamerank_backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Criar uma avaliação
    @PostMapping("/{gameId}/reviews")
    public ResponseEntity<Review> createReview(@PathVariable String gameId, @RequestBody Review review) {
        Review createdReview = reviewService.createReview(gameId, review);
        return ResponseEntity.ok(createdReview);
    }

    // Listar avaliações de um jogo
    @GetMapping("/{gameId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByGameId(@PathVariable String gameId) {
        List<Review> reviews = reviewService.getReviewsByGameId(gameId);
        return ResponseEntity.ok(reviews);
    }

    // Atualizar avaliação
    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable String reviewId, @RequestBody Review updatedReview) {
        return reviewService.updateReview(reviewId, updatedReview)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar avaliação
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable String reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}