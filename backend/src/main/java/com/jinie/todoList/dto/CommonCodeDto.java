package com.jinie.todoList.dto;

import com.jinie.todoList.entity.CommonCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommonCodeDto {

    private Long seq;
    private Long id;
    private String commonCodeId;
    private String upperCode;
    private String useYn;
    private String commonCodeNm;

    public static CommonCodeDto toDto(CommonCode entity){
        return CommonCodeDto.builder()
                .id(entity.getId())
                .seq(entity.getSeq())
                .commonCodeId(entity.getCommonCodeId())
                .upperCode(entity.getUpperCode())
                .useYn(entity.getUseYn())
                .commonCodeNm(entity.getCommonCodeNm())
                .build();
    }

    public  CommonCode toEntity(){
        return CommonCode.builder()
                .seq(this.getSeq())
                .commonCodeId(this.getCommonCodeId())
                .upperCode(this.getUpperCode())
                .useYn(this.getUseYn())
                .commonCodeNm(this.getCommonCodeNm())
                .build();
    }

}
