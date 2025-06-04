package com.BrunoDev.gamerank_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class RecommendationResponse {

    @JsonProperty("recommended_game_ids")
    private List<String> recommendedGameIds;
}