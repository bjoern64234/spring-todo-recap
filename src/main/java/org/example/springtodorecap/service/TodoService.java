package org.example.springtodorecap.service;

import org.example.springtodorecap.model.Todo;
import org.example.springtodorecap.repository.TodoRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepo todoRepo;
    private final IdService idService;


    public TodoService(TodoRepo todoRepo, IdService idService) {
        this.todoRepo = todoRepo;
        this.idService = idService;
    }

    public List<Todo> findAll() {
        return todoRepo.findAll();
    }
}
