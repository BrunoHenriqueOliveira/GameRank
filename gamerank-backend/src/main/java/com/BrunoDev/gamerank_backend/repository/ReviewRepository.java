package com.BrunoDev.gamerank_backend.repository;

import com.BrunoDev.gamerank_backend.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByGameId(String gameId);
}