package com.BrunoDev.gamerank_backend.service;

import com.BrunoDev.gamerank_backend.model.Game;
import com.BrunoDev.gamerank_backend.repository.GameRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @Mock // Cria um mock do GameRepository
    private GameRepository gameRepository;

    @InjectMocks // Injeta os mocks (gameRepository) na instância de GameService
    private GameService gameService;

    private Game sampleGame;

    @BeforeEach // Configurações que são executadas antes de cada método de teste
    void setUp() {
        sampleGame = Game.builder()
                .id("game123")
                .title("The Witcher 3")
                .genre("RPG")
                .developer("CD Projekt Red")
                .build();
    }

    // --- Testes para getGameById ---
    @Test
    void shouldReturnGameWhenFoundById() {
        // Dado: O repositório irá retornar um Optional com o jogo de exemplo
        when(gameRepository.findById(sampleGame.getId())).thenReturn(Optional.of(sampleGame));

        // Quando: Chamamos o método getGameById
        Game foundGame = gameService.getGameById(sampleGame.getId());

        // Então: O jogo retornado deve ser o mesmo que o de exemplo
        assertThat(foundGame).isNotNull();
        assertThat(foundGame.getId()).isEqualTo(sampleGame.getId());
        assertThat(foundGame.getTitle()).isEqualTo(sampleGame.getTitle());

        // Verifica se o método findById foi chamado exatamente uma vez com o ID correto
        verify(gameRepository, times(1)).findById(sampleGame.getId());
    }

    @Test
    void shouldThrowExceptionWhenGameNotFoundById() {
        // Dado: O repositório irá retornar um Optional vazio (jogo não encontrado)
        when(gameRepository.findById("nonExistentId")).thenReturn(Optional.empty());

        // Quando/Então: Deve lançar uma RuntimeException com a mensagem esperada
        assertThatThrownBy(() -> gameService.getGameById("nonExistentId"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Game not found with id: nonExistentId");

        // Verifica se o método findById foi chamado
        verify(gameRepository, times(1)).findById("nonExistentId");
    }

    // --- Testes para updateGame ---
    @Test
    void shouldUpdateGameSuccessfully() {
        // Dado:
        // 1. O jogo existente é encontrado
        when(gameRepository.findById(sampleGame.getId())).thenReturn(Optional.of(sampleGame));

        // 2. O repositório irá retornar o jogo salvo quando o método save for chamado
        // Note: any(Game.class) é usado porque a instância de 'Game' passada para 'save'
        // será 'existingGame' que teve seus campos atualizados.
        when(gameRepository.save(any(Game.class))).thenReturn(sampleGame);

        // Um objeto Game com os dados atualizados
        Game updatedGameData = Game.builder()
                .title("The Witcher 3: Wild Hunt (Updated)")
                .genre("Action RPG")
                .developer("CD Projekt Red S.A.")
                .build();

        // Quando: Chamamos o método updateGame
        Game resultGame = gameService.updateGame(sampleGame.getId(), updatedGameData);

        // Então:
        // 1. O jogo retornado deve ter os dados atualizados
        assertThat(resultGame).isNotNull();
        assertThat(resultGame.getId()).isEqualTo(sampleGame.getId()); // ID permanece o mesmo
        assertThat(resultGame.getTitle()).isEqualTo(updatedGameData.getTitle());
        assertThat(resultGame.getGenre()).isEqualTo(updatedGameData.getGenre());
        assertThat(resultGame.getDeveloper()).isEqualTo(updatedGameData.getDeveloper());

        // 2. Verifica se findById foi chamado uma vez para buscar o jogo
        verify(gameRepository, times(1)).findById(sampleGame.getId());
        // 3. Verifica se save foi chamado uma vez com a instância de Game atualizada
        // ArgumentMatchers.any(Game.class) verifica se qualquer objeto Game foi passado.
        verify(gameRepository, times(1)).save(any(Game.class));
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentGame() {
        // Dado: O repositório não encontra o jogo pelo ID
        when(gameRepository.findById("nonExistentId")).thenReturn(Optional.empty());

        // Um objeto Game com dados de atualização
        Game updatedGameData = Game.builder()
                .title("Non Existent Game Update")
                .build();

        // Quando/Então: Deve lançar uma RuntimeException
        assertThatThrownBy(() -> gameService.updateGame("nonExistentId", updatedGameData))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Game not found with id: nonExistentId");

        // Verifica se findById foi chamado
        verify(gameRepository, times(1)).findById("nonExistentId");
        // Verifica se save NUNCA foi chamado (porque o jogo não foi encontrado)
        verify(gameRepository, never()).save(any(Game.class));
    }

    // --- Testes para deleteGame ---
    @Test
    void shouldDeleteGameSuccessfully() {
        // Dado: O repositório indica que o jogo existe
        when(gameRepository.existsById(sampleGame.getId())).thenReturn(true);

        // Quando: Chamamos o método deleteGame
        gameService.deleteGame(sampleGame.getId());

        // Então: Verifica se deleteById foi chamado exatamente uma vez com o ID correto
        verify(gameRepository, times(1)).deleteById(sampleGame.getId());
        // Verifica se existsById também foi chamado
        verify(gameRepository, times(1)).existsById(sampleGame.getId());
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistentGame() {
        // Dado: O repositório indica que o jogo NÃO existe
        when(gameRepository.existsById("nonExistentId")).thenReturn(false);

        // Quando/Então: Deve lançar uma RuntimeException
        assertThatThrownBy(() -> gameService.deleteGame("nonExistentId"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Game not found with id: nonExistentId");

        // Verifica se existsById foi chamado
        verify(gameRepository, times(1)).existsById("nonExistentId");
        // Verifica se deleteById NUNCA foi chamado (porque o jogo não foi encontrado)
        verify(gameRepository, never()).deleteById(anyString());
    }
}