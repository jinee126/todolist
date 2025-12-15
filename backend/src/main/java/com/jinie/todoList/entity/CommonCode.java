package com.jinie.todoList.entity;

import com.jinie.todoList.dto.CommonCodeDto;
import jakarta.persistence.*;
import lombok.*;


@Setter
@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="COMMON_CODE")
public class CommonCode {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "commonCodeSeq")
    @SequenceGenerator(
            name = "commonCodeSeq",
            sequenceName = "common_code_seq",
            allocationSize = 1
    )
    @Column
    private Long commonCodeSeq;
    @Column
    private String codeId;
    @Column
    private String codeNm;
    @Column
    private String upperCode;
    @Column
    private String codeUseYn;
    @Column
    private String codeOrder;

    public void update(CommonCodeDto dto){
        this.codeId = dto.getCodeId();
        this.codeNm = dto.getCodeNm();
        this.codeUseYn = dto.getCodeUseYn();
        this.upperCode = dto.getUpperCode();
        this.codeUseYn = dto.getCodeUseYn();
        this.codeOrder = dto.getCodeOrder();
    }




}
