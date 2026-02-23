package com.jinie.todoList.service;

import com.jinie.todoList.entity.Menu;
import com.jinie.todoList.repository.MenuRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Transactional
public class MenuService {
    private final MenuRepository menuRepository;

    private void saveMenu(Menu menu){
        //menuRepository.save(menu);
    }



}
