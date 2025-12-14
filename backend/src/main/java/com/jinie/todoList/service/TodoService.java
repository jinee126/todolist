package com.jinie.todoList.service;

import com.jinie.todoList.dto.TodoRequest;
import com.jinie.todoList.dto.TodoResponse;
import com.jinie.todoList.entity.Todo;
import com.jinie.todoList.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoService {
    
    private final TodoRepository todoRepository;
    
    public List<TodoResponse> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(TodoResponse::from)
                .collect(Collectors.toList());
    }
    
    public TodoResponse getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("할일을 찾을 수 없습니다"));
        return TodoResponse.from(todo);
    }
    
    @Transactional
    public TodoResponse createTodo(TodoRequest request) {
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .completed(request.getCompleted() != null ? request.getCompleted() : false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        
        Todo savedTodo = todoRepository.save(todo);
        return TodoResponse.from(savedTodo);
    }
    
    @Transactional
    public TodoResponse updateTodo(Long id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("할일을 찾을 수 없습니다"));
        
        if (request.getTitle() != null) {
            todo.setTitle(request.getTitle());
        }
        if (request.getCompleted() != null) {
            todo.setCompleted(request.getCompleted());
        }
        todo.setUpdatedAt(LocalDateTime.now());
        
        return TodoResponse.from(todoRepository.save(todo));
    }
    
    @Transactional
    public void deleteTodo(Long id) {
        //TODO: existsById 대신 findById로 변경 고려
        if (!todoRepository.existsById(id)) {
            throw new IllegalArgumentException("할일을 찾을 수 없습니다");
        }
        todoRepository.deleteById(id);
    }
}
