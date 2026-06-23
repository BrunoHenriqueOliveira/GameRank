package com.BrunoDev.gamerank_backend.config;

import com.BrunoDev.gamerank_backend.model.Game;
import com.BrunoDev.gamerank_backend.repository.GameRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements ApplicationRunner {

    private final GameRepository gameRepository;

    public DataSeeder(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (gameRepository.count() > 0) {
            return;
        }

        List<Game> games = List.of(
            Game.builder().title("Halo Infinite").genre("FPS").developer("343 Industries").reviews(new ArrayList<>()).build(),
            Game.builder().title("Forza Horizon 5").genre("Corrida").developer("Playground Games").reviews(new ArrayList<>()).build(),
            Game.builder().title("Gears 5").genre("Ação").developer("The Coalition").reviews(new ArrayList<>()).build(),
            Game.builder().title("Sea of Thieves").genre("Aventura").developer("Rare").reviews(new ArrayList<>()).build(),
            Game.builder().title("Microsoft Flight Simulator").genre("Simulação").developer("Asobo Studio").reviews(new ArrayList<>()).build(),
            Game.builder().title("Ori and the Will of the Wisps").genre("Plataforma").developer("Moon Studios").reviews(new ArrayList<>()).build(),
            Game.builder().title("Psychonauts 2").genre("Plataforma").developer("Double Fine Productions").reviews(new ArrayList<>()).build(),
            Game.builder().title("Grounded").genre("Sobrevivência").developer("Obsidian Entertainment").reviews(new ArrayList<>()).build(),
            Game.builder().title("The Outer Worlds").genre("RPG").developer("Obsidian Entertainment").reviews(new ArrayList<>()).build(),
            Game.builder().title("Starfield").genre("RPG").developer("Bethesda Game Studios").reviews(new ArrayList<>()).build(),
            Game.builder().title("Forza Motorsport").genre("Corrida").developer("Turn 10 Studios").reviews(new ArrayList<>()).build(),
            Game.builder().title("Age of Empires IV").genre("Estratégia").developer("Relic Entertainment").reviews(new ArrayList<>()).build(),
            Game.builder().title("Pentiment").genre("Aventura").developer("Obsidian Entertainment").reviews(new ArrayList<>()).build(),
            Game.builder().title("Hi-Fi Rush").genre("Ação/Ritmo").developer("Tango Gameworks").reviews(new ArrayList<>()).build(),
            Game.builder().title("Senua's Saga: Hellblade II").genre("Ação").developer("Ninja Theory").reviews(new ArrayList<>()).build(),
            Game.builder().title("Minecraft Legends").genre("Estratégia").developer("Mojang Studios").reviews(new ArrayList<>()).build()
        );

        gameRepository.saveAll(games);
        System.out.println("[DataSeeder] 16 jogos do catálogo Xbox inseridos com sucesso.");
    }
}
