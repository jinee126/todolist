package com.jinie.todoList.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration //빈을 만드는 설정
public class GeminiConfig {

    //요청 양식
//        curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
//                -H "x-goog-api-key: $GEMINI_API_KEY" \
//                -H 'Content-Type: application/json' \
//                -X POST \
//                -d '{
//                "contents": [
//        {
//            "parts": [
//            {
//                "text": "Explain how AI works in a single paragraph."
//            }
//            ]
//        }
//        ]
//    }'

    @Value("${gemini.api.base-url}")
    private String baseUrl;

    @Value("${gemini.api.key}")
    private String key;

    @Bean
    public WebClient geminiWebClient(WebClient.Builder builder){
        return builder.baseUrl(baseUrl).defaultHeader("x-goog-api-key", key)

                .build();
    }
}
