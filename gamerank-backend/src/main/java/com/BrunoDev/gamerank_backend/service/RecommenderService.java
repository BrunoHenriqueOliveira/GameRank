package com.BrunoDev.gamerank_backend.service;

import com.BrunoDev.gamerank_backend.model.RecommendationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecommenderService {

    @Autowired
    private RestTemplate restTemplate;

    public List<String> getRecommendations(String preference) {
        String recommenderUrl = "http://localhost:5000/recommend";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("preference", preference);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<RecommendationResponse> response = restTemplate
                .postForEntity(recommenderUrl, entity, RecommendationResponse.class);

        return response.getBody().getRecommendations();
    }
}
