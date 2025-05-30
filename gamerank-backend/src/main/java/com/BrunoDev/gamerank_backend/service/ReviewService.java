package com.BrunoDev.gamerank_backend.service;

import com.BrunoDev.gamerank_backend.model.Review;
import com.BrunoDev.gamerank_backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Criar avaliação
    public Review createReview(String gameId, Review review) {
        review.setGameId(gameId);
        review.setDate(LocalDate.now());
        return reviewRepository.save(review);
    }

    // Listar avaliações de um jogo
    public List<Review> getReviewsByGameId(String gameId) {
        return reviewRepository.findByGameId(gameId);
    }

    // Atualizar avaliação
    public Optional<Review> updateReview(String reviewId, Review updatedReview) {
        return reviewRepository.findById(reviewId).map(existingReview -> {
            existingReview.setAuthor(updatedReview.getAuthor());
            existingReview.setContent(updatedReview.getContent());
            existingReview.setRating(updatedReview.getRating());
            existingReview.setDate(LocalDate.now());
            return reviewRepository.save(existingReview);
        });
    }

    // Deletar avaliação
    public void deleteReview(String reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
