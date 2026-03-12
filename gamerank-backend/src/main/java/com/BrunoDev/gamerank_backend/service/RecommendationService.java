package com.BrunoDev.gamerank_backend.service;

import com.BrunoDev.gamerank_backend.dto.PreferenceRequest;
import com.BrunoDev.gamerank_backend.dto.RecommendationResponse;
import com.BrunoDev.gamerank_backend.model.Game;
import com.BrunoDev.gamerank_backend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@Service
public class RecommendationService {

    @Autowired
    private RetryTemplate retryTemplate;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${RECOMMENDATION_SERVICE_URL}")
    private String recommendationServiceUrl;

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getRecommendations(PreferenceRequest request) {
        return retryTemplate.execute(context -> {
            ResponseEntity<RecommendationResponse> response = restTemplate.postForEntity(
                    recommendationServiceUrl + "/recommend",
                    request,
                    RecommendationResponse.class
            );

            List<String> gameIds = Objects.requireNonNull(response.getBody()).getRecommendedGameIds();
            return gameRepository.findAllById(gameIds);
        });
    }
}
