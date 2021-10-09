package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class UsersService {

    @Autowired
    private JdbcTemplate jdbcTemplate = new JdbcTemplate();


    public List<Users> findAll() {
        // 実行する SQL を組み立てて実行
        String query = "SELECT * from users";
        List<Users> users = jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Users.class));
        return users;
    }
}
