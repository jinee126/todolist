package com.jinie.todoList.service;

import com.jinie.todoList.dto.CommonCodeDto;
import com.jinie.todoList.entity.CommonCode;
import com.jinie.todoList.repository.CommonCodeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
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

    @Transactional
    public CommonCodeDto saveCommonCode(CommonCodeDto param){
        log.debug("들어오나");
        //중복체크 로직

        CommonCode  arg = param.toEntity();
        CommonCode savedEntity = commonCodeRepository.save(arg);
        return CommonCodeDto.toDto(savedEntity);
    }



}
