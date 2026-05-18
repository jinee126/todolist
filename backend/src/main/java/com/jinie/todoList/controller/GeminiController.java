package com.jinie.todoList.controller;


import com.jinie.todoList.entity.Todo;
import com.jinie.todoList.repository.TodoRepository;
import com.jinie.todoList.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GeminiController {

    private final GeminiService geminiService;
    private final TodoRepository todoRepository;

    @PostMapping("/gemini/ask")
    public Mono<String> callGemini() {
        List<Todo> completedTodos = todoRepository.findAllByCompletedTrue();
        log.debug("완료된 todo 수: {}", completedTodos.size());

        if (completedTodos.isEmpty()) {
            return Mono.just("완료된 할 일이 없어 추천을 생성할 수 없습니다.");
        }

        StringBuilder prompt = new StringBuilder();
        prompt.append("내가 완료한 todolist 목록이야:\n");
        for (int i = 0; i < completedTodos.size(); i++) {
            prompt.append(i + 1).append(". ").append(completedTodos.get(i).getTitle()).append("\n");
        }
        prompt.append("\n위 목록을 참고해서 다음에 할 만한 일을 카테고리별로 2개씩 추천해줘. 리스트 형태로만 작성해줘.");

        return geminiService.getGeminiReponse(prompt.toString());
    }

}
