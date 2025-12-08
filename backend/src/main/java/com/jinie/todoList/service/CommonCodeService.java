package com.jinie.todoList.service;

import com.jinie.todoList.dto.CommonCodeDto;
import com.jinie.todoList.entity.CommonCode;
import com.jinie.todoList.repository.CommonCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor //final 필드 생성자주입
@Service
public class CommonCodeService {

    private final CommonCodeRepository commonCodeRepository;


    public List<CommonCodeDto> getCommonList(){
        return commonCodeRepository.findAllByUseYn("Y")
                .stream()
                .map(CommonCodeDto::toDto)
                .collect(Collectors.toList());
    }




}
