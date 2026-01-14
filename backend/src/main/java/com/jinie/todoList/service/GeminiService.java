package com.jinie.todoList.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
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
                .doOnNext(
                        response -> {
                            try {
                                log.debug("response : " + response);
                            } catch (Error e) {
                                e.printStackTrace();
                            }
                        }
                );
    }

}
