package com.jinie.todoList.entity;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "commonCodeId")
    @SequenceGenerator(
            name = "commonCodeId",
            sequenceName = "commoncode_seq",  // Oracle의 실제 시퀀스 이름
            allocationSize = 1  // 중요: Oracle 시퀀스와 동기화
    )

    @Column
    private Long id ;

    @Column
    private String commonCodeId ;

    @Column
    private Long seq;

    @Column
    private String upperCode;
    @Column
    private String useYn;
    @Column
    private String commonCodeNm;


}
