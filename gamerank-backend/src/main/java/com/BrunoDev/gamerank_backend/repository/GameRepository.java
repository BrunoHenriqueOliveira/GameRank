package com.BrunoDev.gamerank_backend.repository;

import com.BrunoDev.gamerank_backend.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
}
