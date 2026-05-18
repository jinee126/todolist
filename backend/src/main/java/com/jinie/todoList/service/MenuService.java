package com.jinie.todoList.service;

import com.jinie.todoList.dto.MenuDto;
import com.jinie.todoList.entity.Menu;
import com.jinie.todoList.repository.MenuRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class MenuService {
    private final MenuRepository menuRepository;

    private void saveMenu(Menu menu){
        //menuRepository.save(menu);
    }

    public List<MenuDto> getMenuList(){
        return menuRepository.findAll()
                .stream()
                .map(MenuDto::toDto)
                .collect(Collectors.toList());

    }



}
