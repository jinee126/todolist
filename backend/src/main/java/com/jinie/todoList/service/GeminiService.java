package com.jinie.todoList.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class GeminiService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api.base-url}")
    private String baseUrl;


    public Mono<String> getGeminiReponse(String promt) {
        Map<String, Object> requestBody = Map.of("contents",
                List.of(Map.of("parts", List.of(Map.of("text", promt)))
                )
        );

        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .map(this::extractText)
                .doOnNext(text -> log.debug("gemini 응답 텍스트: {}", text));
    }

    private String extractText(String rawJson) {
        try {
            JsonNode root = objectMapper.readTree(rawJson);
            return root.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText("추천 목록을 생성하지 못했습니다.");
        } catch (Exception e) {
            log.error("gemini 응답 파싱 실패", e);
            return "추천 목록을 생성하지 못했습니다.";
        }
    }

}
