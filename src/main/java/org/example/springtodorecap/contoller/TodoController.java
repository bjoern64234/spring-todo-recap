package org.example.springtodorecap.contoller;

import org.example.springtodorecap.dto.TodoDto;
import org.example.springtodorecap.model.Todo;
import org.example.springtodorecap.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return this.todoService.findAll();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable String id) {
        return this.todoService.findById(id);
    }

    @PostMapping
    public Todo saveTodo(@RequestBody TodoDto todoDto) {
        return this.todoService.saveTodo(todoDto);
    }
}
