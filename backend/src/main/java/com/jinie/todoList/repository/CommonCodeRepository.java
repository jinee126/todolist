package com.jinie.todoList.repository;

import com.jinie.todoList.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, Long> {

    List<CommonCode> findAllByUseYn(String useYn);

}
