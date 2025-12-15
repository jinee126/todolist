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

    private Long commonCodeSeq;
    private String codeId;
    private String codeNm;
    private String upperCode;
    private String codeUseYn;
    private String codeOrder;

    public static CommonCodeDto toDto(CommonCode entity){
        return CommonCodeDto.builder()
                .commonCodeSeq(entity.getCommonCodeSeq())
                .codeId(entity.getCodeId())
                .codeNm(entity.getCodeNm())
                .upperCode(entity.getUpperCode())
                .codeUseYn(entity.getCodeUseYn())
                .codeOrder(entity.getCodeOrder())
                .build();
    }

    public  CommonCode toEntity(){
        return CommonCode.builder()
                .commonCodeSeq(this.commonCodeSeq)
                .codeId(this.getCodeId())
                .codeNm(this.getCodeNm())
                .upperCode(this.getUpperCode())
                .codeUseYn(this.getCodeUseYn())
                .codeOrder(this.getCodeOrder())
                .build();
    }

}
