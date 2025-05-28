package com.BrunoDev.gamerank_backend.controller;

import com.BrunoDev.gamerank_backend.model.Game;
import com.BrunoDev.gamerank_backend.model.PreferenceRequest;
import com.BrunoDev.gamerank_backend.repository.GameRepository;

import com.BrunoDev.gamerank_backend.service.RecommenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @GetMapping
    public List<Game> getAllGames(){
        return gameRepository.findAll();
    }

    @PostMapping
    public Game createGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }

    @Autowired
    private RecommenderService recommenderService;

    @PostMapping("/recommend")
    public List<String> getRecommendedGames(@RequestBody PreferenceRequest request) {
        return recommenderService.getRecommendations(request.getPreference());
    }
}
