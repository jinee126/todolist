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
@Transactional
public class CommonCodeService {

    private final CommonCodeRepository commonCodeRepository;


    public List<CommonCodeDto> getCommonList(){
        return commonCodeRepository.findAll()
                .stream()
                .map(CommonCodeDto::toDto)
                .collect(Collectors.toList());
    }

    //중복체크
    public Long getCountByCodeId(String codeId){
        return commonCodeRepository.countByCodeId(codeId);
    }


    public CommonCodeDto saveCommonCode(CommonCodeDto param) throws Exception {
        //TODO: 중복체크 로직 추가 필요
        Long count = commonCodeRepository.countByCodeId(param.getCodeId());
        if(count > 0){
            throw new Exception("공통코드 ID가 존재합니다.");
        }
        CommonCode  arg = param.toEntity();
        CommonCode savedEntity = commonCodeRepository.save(arg);
        return CommonCodeDto.toDto(savedEntity);
    }

    public void deleteCommonCode(Long id){
        commonCodeRepository.deleteById(id);
    }

    public CommonCodeDto updateCommonCode(CommonCodeDto param)  throws Exception {
        //dirty checking - 변경감지

        //id
        CommonCode info = commonCodeRepository.findById(param.getCommonCodeSeq())
                .orElseThrow(()-> new Exception("공통코드를 찾을 수 없음 : "+param.getCommonCodeSeq())); //내부에서 throw함

        //commoncode id 중복체크
        if (!info.getCodeId().equals(param.getCodeId())) {
            long duplCnt = commonCodeRepository.countByCodeId(param.getCodeId());
            if (duplCnt > 0) {
                throw new Exception("공통코드 중복 getCodeId : " + param.getCodeId());
            }
        }
        info.update(param);
        return CommonCodeDto.toDto(info);
    }

}
