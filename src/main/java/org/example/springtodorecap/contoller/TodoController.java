package org.example.springtodorecap.contoller;

import org.example.springtodorecap.dto.TodoDto;
import org.example.springtodorecap.model.Todo;
import org.example.springtodorecap.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PutMapping("/{id}")
    public Todo updateTodoById(@PathVariable String id, @RequestBody TodoDto todoDto) {
        return this.todoService.updateTodo(id, todoDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTodoById(@PathVariable String id) {
        return this.todoService.deleteTodo(id);
    }
}
