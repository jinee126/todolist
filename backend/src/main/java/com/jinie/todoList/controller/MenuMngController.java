package com.jinie.todoList.controller;

import com.jinie.todoList.dto.CommonCodeDto;
import com.jinie.todoList.dto.MenuDto;
import com.jinie.todoList.service.CommonCodeService;
import com.jinie.todoList.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuMngController {

    private final MenuService menuService;

    //저장
    @PostMapping
    public ResponseEntity saveCommonCode(@RequestBody MenuDto param) throws Exception {
        log.debug("확인 {}" ,param.toString() );
        //CommonCodeDto  dto = commonCodeService.saveCommonCode(param);
        return ResponseEntity.ok(HttpStatus.OK);
    }




}
