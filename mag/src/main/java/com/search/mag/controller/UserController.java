package com.search.mag.controller;

import com.search.mag.model.User;
import com.search.mag.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @GetMapping("/date-range")
    public List<User> getUsersByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        return userService.getUsersByDateRange(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @GetMapping("/profession")
    public List<User> getUsersByProfession(@RequestParam String profession) {
        return userService.getUsersByProfession(profession);
    }

    @GetMapping("/all-professions")
    public List<String> getAllProfessions() {
        return userService.getAllProfessions();
    }
}

