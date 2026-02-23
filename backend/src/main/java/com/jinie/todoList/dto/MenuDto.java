package com.jinie.todoList.dto;

import com.jinie.todoList.entity.CommonCode;
import com.jinie.todoList.entity.Menu;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuDto {

    private Long menuSeq;
    private String parentMenuSeq;
    private String name;
    private String depth;
    private String menuUrl;
    private String menuOrder;
    private String iconClass;
    private String description;
    private String useYn;
    private String createId;
    private String updateId;

    private Menu  toEntity(){
        return  Menu.builder()
                .menuSeq(this.menuSeq)
                .parentMenuSeq(this.parentMenuSeq)
                .name(this.name)
                .depth(this.depth)
                .menuUrl(this.menuUrl)
                .menuOrder(this.menuOrder)
                .iconClass(this.iconClass)
                .description(this.description)
                .useYn(this.useYn)
                .createId(this.createId)
                .updateId(this.updateId)
                .build();
    }



}
