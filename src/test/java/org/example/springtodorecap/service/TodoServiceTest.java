package org.example.springtodorecap.service;

import org.example.springtodorecap.dto.TodoDto;
import org.example.springtodorecap.model.Todo;
import org.example.springtodorecap.repository.TodoRepo;
import org.example.springtodorecap.utils.Status;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class TodoServiceTest {

    private final TodoRepo mockTodoRepo = Mockito.mock(TodoRepo.class);
    private final IdService mockIdService = Mockito.mock(IdService.class);

    @Test
    void getAll() {
        // Given
        TodoService todoService = new TodoService(this.mockTodoRepo, this.mockIdService);
        Todo todo = Todo.builder().id("1").description("My todo").status(Status.OPEN).build();
        List<Todo> expected = new ArrayList<>(List.of(todo));
        when(this.mockTodoRepo.findAll()).thenReturn(expected);
        // When
        List<Todo> actual = todoService.findAll();
        // Then
        assertEquals(expected, actual);
        verify(this.mockTodoRepo).findAll();
    }

    @Test
    void saveTodo() {
        // Given
        TodoService todoService = new TodoService(this.mockTodoRepo, this.mockIdService);
        String id = "1";
        TodoDto todoDto = TodoDto.builder().description("My todo").status(Status.OPEN).build();
        Todo expected = Todo.builder().id(id).description("My todo").status(Status.OPEN).build();
        when(this.mockIdService.generateId()).thenReturn(id);
        when(this.mockTodoRepo.save(expected)).thenReturn(expected);
        // When
        Todo actual = todoService.saveTodo(todoDto);
        // Then
        assertEquals(expected, actual);
        verify(this.mockTodoRepo).save(expected);
        verify(this.mockIdService).generateId();
    }
}