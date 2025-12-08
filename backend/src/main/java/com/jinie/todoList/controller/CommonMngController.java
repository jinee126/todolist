package com.jinie.todoList.controller;

import com.jinie.todoList.dto.CommonCodeDto;
import com.jinie.todoList.dto.TodoRequest;
import com.jinie.todoList.dto.TodoResponse;
import com.jinie.todoList.service.CommonCodeService;
import com.jinie.todoList.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commonCode")
@RequiredArgsConstructor
public class CommonMngController {
    
    private final CommonCodeService commonCodeService;
    
    @GetMapping
    public ResponseEntity<List<CommonCodeDto>> getAllTodos() {
        List<CommonCodeDto> list = commonCodeService.getCommonList();
        return ResponseEntity.ok(list);
    }

}
