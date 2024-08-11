package com.search.mag.controller;

import com.search.mag.model.User;
import com.search.mag.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to return all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);  // 200 OK with the list of users
    }

    // Endpoint to return a specific user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);  // 200 OK with the user data
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }

    // Endpoint to return users created between a date range
    @GetMapping("/date-range")
    public ResponseEntity<List<User>> getUsersByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<User> users = userService.getUsersByDateRange(start, end);
        return ResponseEntity.ok(users);  // 200 OK with the filtered list of users
    }

    // Endpoint to return users by profession
    @GetMapping("/profession")
    public ResponseEntity<List<User>> getUsersByProfession(@RequestParam String profession) {
        List<User> users = userService.getUsersByProfession(profession);
        return ResponseEntity.ok(users);  // 200 OK with the filtered list of users
    }

    // Endpoint to return all distinct professions
    @GetMapping("/all-professions")
    public ResponseEntity<List<String>> getAllProfessions() {
        List<String> professions = userService.getAllProfessions();
        return ResponseEntity.ok(professions);  // 200 OK with the list of professions
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User newUser) {
        User addedUser = userService.addUser(newUser);
        return ResponseEntity.status(201).body(addedUser);
    }


}
