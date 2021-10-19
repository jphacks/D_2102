package com.example.jphacks_server.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Users;
import com.example.jphacks_server.service.LoginService;
import com.example.jphacks_server.service.UsersService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UsersService usersService;


    @Autowired
    private LoginService loginService;



    @RequestMapping("/")
    public List<Users> usersAll(){
        return usersService.findAll();
    }

    @PostMapping("/user")
    public List<Users> usersPage(){
        return usersService.findAll();
    }



    @PostMapping("/login")
    public ResponseEntity<String> loginControl(@RequestBody Users usersData) {
        return loginService.login(usersData);
    }
}
