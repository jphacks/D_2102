package com.example.jphacks_server.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Users;
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


    HttpHeaders responseHeaders = new HttpHeaders();

    public Controller(){
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
    }


    @RequestMapping("/")
    public List<Users> usersAll(){
        return usersService.findAll();
    }

    @PostMapping("/user")
    public List<Users> usersPage(){
        return usersService.findAll();
    }



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users usersData) {
        String token = usersService.login(usersData.getUsersLoginId(), usersData.getUsersLoginPassword());
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();

        if(token == null){
            root.put("status", "failed");
            responseHeaders.remove("Authorization");
        }else{
            root.put("status", "success");
            responseHeaders.set("Authorization", token);
        }

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(root), responseHeaders, HttpStatus.OK);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return  responseEntity;




    }
}
