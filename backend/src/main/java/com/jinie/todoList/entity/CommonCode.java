package com.jinie.todoList.entity;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "commonCodeId")
    @SequenceGenerator(
            name = "commonCodeId",
            sequenceName = "commoncode_seq",
            allocationSize = 1
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
