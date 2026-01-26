package com.jinie.todoList.controller;


import com.jinie.todoList.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GeminiController {

    private final GeminiService geminiService;

    @PostMapping("/gemini/ask")
    public Mono<String> callGemini(@RequestBody Map<String, Object> requestBody) {
        log.debug("제미나이 요청");
        String prompt ="";
        prompt += "이게 내가 todolist 완료한 목록인데, 추천목록을 작성해줘";
        prompt += "/ 앞 단어는 카테고리이야";
        prompt += "공부/1.제미나이ai - spring ai 연동하기";
        prompt += "취미/1.수영 다녀오기";
        prompt += "카테고리별 리스트형태로만 2개씩만 작성해서 알려줘";

       return geminiService.getGeminiReponse(prompt);
    }

}
