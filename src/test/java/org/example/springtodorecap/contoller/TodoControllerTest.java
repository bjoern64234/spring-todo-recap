package org.example.springtodorecap.contoller;

import org.example.springtodorecap.model.Todo;
import org.example.springtodorecap.repository.TodoRepo;
import org.example.springtodorecap.utils.Status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TodoRepo todoRepo;

    @Test
    void getTodos() throws Exception {
        this.mockMvc.perform(get("/api/todo"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("[]"));
    }

    @Test
    void getTodoById() throws Exception {
        Todo todo = Todo.builder().id("1").description("my todo").status(Status.OPEN).build();
        this.todoRepo.save(todo);
        this.mockMvc.perform(get("/api/todo/" + todo.id()))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("""
                  {"id": "1", "description": "my todo", "status": "OPEN"}
                """));
    }

    @Test
    void saveTodo() throws Exception {
        this.mockMvc.perform(post("/api/todo").contentType("application/json").content("""
                {"description": "my todo", "status": "OPEN"}
                """))
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("""
                  {"description": "my todo", "status": "OPEN"}
                """)).andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    void updateTodoById() throws Exception {
        Todo todo = Todo.builder().id("1").description("my todo").status(Status.OPEN).build();
        this.todoRepo.save(todo);
        this.mockMvc.perform(put("/api/todo/" + todo.id()).contentType("application/json").content("""
                {"description": "my todo 2", "status": "DONE"}
                """))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(content().json("""
                  {"id": "1", "description": "my todo 2", "status": "DONE"}
                """));
    }

    @Test
    void deleteTodoById() throws Exception {
        Todo todo = Todo.builder().id("1").description("my todo").status(Status.DONE).build();
        this.todoRepo.save(todo);
        mockMvc.perform(delete("/api/todo/" + todo.id()))
                .andExpect(status().isOk());
    }
}