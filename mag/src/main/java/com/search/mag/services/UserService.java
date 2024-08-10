package com.search.mag.services;

import com.search.mag.model.User;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService {

    private List<User> users = new ArrayList<>();

    @PostConstruct
    public void init() {
        try (Reader reader = new BufferedReader(new FileReader("UserInformation.csv"))) {
            CsvToBean<User> csvToBean = new CsvToBeanBuilder<User>(reader)
                    .withType(User.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();
            users = csvToBean.parse();
            log.info("Loaded {} users", users.size());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public User getUserById(String id) {
        return users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public List<User> getUsersByDateRange(LocalDate startDate, LocalDate endDate) {
        return users.stream()
                .filter(user -> !user.getCreatedDate().isBefore(startDate) && !user.getCreatedDate().isAfter(endDate))
                .collect(Collectors.toList());
    }

    public List<User> getUsersByProfession(String profession) {
        return users.stream()
                .filter(user -> user.getProfession().equalsIgnoreCase(profession))
                .collect(Collectors.toList());
    }

    public List<String> getAllProfessions() {
        return users.stream()
                .map(User::getProfession)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<User> getAllUsers() {
        return users;
    }

    public User addUser(User newUser) {
        users.add(newUser);
        return newUser;
    }

}
