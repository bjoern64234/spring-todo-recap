package org.example.springtodorecap.service;

import org.example.springtodorecap.dto.TodoDto;
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
        return this.todoRepo.findAll();
    }

    public Todo findById(String id) {
        return this.todoRepo.findById(id).orElse(null);
    }

    public Todo saveTodo(TodoDto todoDto) {
        Todo newTodo = Todo.builder().build()
                .withId(this.idService.generateId())
                .withDescription(todoDto.description())
                .withStatus(todoDto.status());

        this.todoRepo.save(newTodo);

        return newTodo;
    }

    public Todo updateTodo(String id, TodoDto todo) {
        Todo currentTodo = this.todoRepo.findById(id).orElse(null);

        if (currentTodo == null) {
            return null;
        }

        Todo updateTodo = currentTodo
                .withDescription(todo.description())
                .withStatus(todo.status());

        this.todoRepo.save(updateTodo);

        return updateTodo;
    }
}
