package com.jinie.todoList.controller;

import com.jinie.todoList.dto.CommonCodeDto;
import com.jinie.todoList.dto.TodoRequest;
import com.jinie.todoList.dto.TodoResponse;
import com.jinie.todoList.service.CommonCodeService;
import com.jinie.todoList.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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

    //저장
    @PostMapping
    public ResponseEntity<CommonCodeDto> saveCommonCode(@RequestBody CommonCodeDto param) throws Exception {
        log.debug("확인 {}" ,param.toString() );
        CommonCodeDto  dto = commonCodeService.saveCommonCode(param);
        return ResponseEntity.ok(dto);
    }

    //삭제
    @DeleteMapping("/{id}")
    public ResponseEntity delCommonCode(@PathVariable Long id) {
        log.debug("id : "+id);
        commonCodeService.deleteCommonCode(id);
        return ResponseEntity.ok().build();
    }

    //수정
    @PutMapping()
    public ResponseEntity<CommonCodeDto> updateCommonCode(@RequestBody CommonCodeDto param) throws Exception{
        CommonCodeDto dto  = commonCodeService.updateCommonCode(param);
        return ResponseEntity.ok(dto);
    }




}
