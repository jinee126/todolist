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
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@RequiredArgsConstructor
@Service
public class CommonCodeService {

    private final CommonCodeRepository commonCodeRepository;


    public List<CommonCodeDto> getCommonList(){
        return commonCodeRepository.findAllByUseYn("Y")
                .stream()
                .map(CommonCodeDto::toDto)
                .collect(Collectors.toList());
    }

    //중복체크
    public Long getCountByCommonCodeId(String commonCodeId){
        return commonCodeRepository.countByCommonCodeId(commonCodeId);
    }

    @Transactional
    public CommonCodeDto saveCommonCode(CommonCodeDto param) throws Exception {
        //TODO: 중복체크 로직 추가 필요
        Long count = getCountByCommonCodeId(param.getCommonCodeId());
        if(count > 0){
            throw new Exception("공통코드 ID가 존재합니다.");
        }

        CommonCode  arg = param.toEntity();
        CommonCode savedEntity = commonCodeRepository.save(arg);
        return CommonCodeDto.toDto(savedEntity);
    }

    @Transactional
    public void deleteCommonCode(Long id){
        commonCodeRepository.deleteById(id);
    }



}
