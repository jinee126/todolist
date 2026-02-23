package com.jinie.todoList.entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="MENU")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "menuSeq")
    @SequenceGenerator(
            name = "menuSeq",
            sequenceName = "menu_seq",
            allocationSize = 1
    )
    @Column
    private Long menuSeq;

    @Column
    private String parentMenuSeq;

    @Column
    private String name;

    @Column
    private String depth;

    @Column
    private String menuUrl;

    @Column
    private String menuOrder;

    @Column
    private String iconClass;

    @Column
    private String description;

    @Column
    private String useYn;

    @Column
    private String createId;

    @Column
    private String updateId;


}
