package com.search.mag.model;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;
import lombok.Data;

import java.time.LocalDate;


@Data
public class User {
    @CsvBindByName
    private String id;

    @CsvBindByName(column = "firstname")
    private String firstName;

    @CsvBindByName(column = "lastname")
    private String lastName;

    @CsvBindByName
    private String email;

    @CsvBindByName
    private String profession;

    @CsvDate("yyyy-MM-dd")
    @CsvBindByName(column = "dateCreated")
    private LocalDate createdDate;

    @CsvBindByName
    private String country;

    @CsvBindByName
    private String city;
}

