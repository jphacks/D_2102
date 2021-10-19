package com.example.jphacks_server.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Schools;
import com.example.jphacks_server.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UsersService {

    @Autowired
    JdbcTemplate jdbcTemplate;



    public List<Users> findAll() {
        // 実行する SQL を組み立てて実行
        String query = "SELECT * from users";
        List<Users> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Users.class));
        return users;
    }



}
