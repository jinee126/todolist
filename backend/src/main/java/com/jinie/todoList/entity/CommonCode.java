package com.jinie.todoList.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;


@Setter
@Getter
@Builder
@Entity

//lombok 어노테이션- 기본생성자
@NoArgsConstructor


@AllArgsConstructor //모든 필드를 받는 생성자 - .build()
@Table(name="COMMON_CODE")
public class CommonCode {

    @Id
    private Long seq;

    @Column
    private String commonCodeId ;
    @Column
    private String upperCode;
    @Column
    private String useYn;
    @Column
    private String commonCodeNm;


}
