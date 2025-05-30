package com.BrunoDev.gamerank_backend.service;

import com.BrunoDev.gamerank_backend.model.Game;
import com.BrunoDev.gamerank_backend.repository.GameRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GameServiceTest {

    @Mock
    private GameRepository gameRepository;

    @InjectMocks
    private GameService gameService;

    private Game game;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        game = new Game();
        game.setId("123");
        game.setTitle("Elden Ring");
        game.setGenre("RPG");
        game.setDeveloper("FromSoftware");
    }

    @Test
    void getGameById_ShouldReturnGame_WhenGameExists() {
        when(gameRepository.findById("123")).thenReturn(Optional.of(game));

        Game result = gameService.getGameById("123");

        assertNotNull(result);
        assertEquals("Elden Ring", result.getTitle());
        verify(gameRepository, times(1)).findById("123");
    }

    @Test
    void getGameById_ShouldThrowException_WhenGameDoesNotExist() {
        when(gameRepository.findById("999")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            gameService.getGameById("999");
        });

        assertEquals("Game not found with id: 999", exception.getMessage());
    }

    @Test
    void updateGame_ShouldUpdateFields_WhenGameExists() {
        Game updatedGame = new Game();
        updatedGame.setTitle("Updated Title");
        updatedGame.setGenre("Adventure");
        updatedGame.setDeveloper("Updated Dev");

        when(gameRepository.findById("123")).thenReturn(Optional.of(game));
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game result = gameService.updateGame("123", updatedGame);

        assertEquals("Updated Title", result.getTitle());
        assertEquals("Adventure", result.getGenre());
        assertEquals("Updated Dev", result.getDeveloper());
    }

    @Test
    void deleteGame_ShouldDelete_WhenGameExists() {
        when(gameRepository.existsById("123")).thenReturn(true);
        doNothing().when(gameRepository).deleteById("123");

        assertDoesNotThrow(() -> gameService.deleteGame("123"));
        verify(gameRepository, times(1)).deleteById("123");
    }

    @Test
    void deleteGame_ShouldThrowException_WhenGameDoesNotExist() {
        when(gameRepository.existsById("999")).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            gameService.deleteGame("999");
        });

        assertEquals("Game not found with id: 999", exception.getMessage());
    }
}