package com.BrunoDev.gamerank_backend.controller;

import com.BrunoDev.gamerank_backend.dto.PreferenceRequest;
import com.BrunoDev.gamerank_backend.model.Game;
import com.BrunoDev.gamerank_backend.repository.GameRepository;
import com.BrunoDev.gamerank_backend.service.GameService;
import com.BrunoDev.gamerank_backend.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")

public class GameController {

    @Autowired
    private GameService gameService;
    private final GameRepository gameRepository;

    @Autowired
    private RecommendationService recommendationService;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @PostMapping
    public Game createGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable String id) {
        Game game = gameService.getGameById(id);
        return ResponseEntity.ok(game);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable String id, @RequestBody Game updatedGame) {
        Game game = gameService.updateGame(id, updatedGame);
        return ResponseEntity.ok(game);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable String id) {
        gameService.deleteGame(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/games/recommend")
    public ResponseEntity<List<Game>> getRecommendedGames(@RequestBody PreferenceRequest request) {
        List<Game> games = recommendationService.getRecommendations(request);
        return ResponseEntity.ok(games);
    }
}