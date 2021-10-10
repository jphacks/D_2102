package com.example.jphacks_server.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Users;
import com.example.jphacks_server.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class Controller {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Autowired
    private UsersService usersService;






    @RequestMapping("/")
    public List<Users> usersAll(){
        return usersService.findAll();
    }



    @RequestMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users usersData) {
        String usersId = usersService.login(usersData.getUsersLoginId(), usersData.getUsersLoginPassword());
        String token = usersService.createToken(usersId);

        if(token == null) return ResponseEntity.badRequest().body("Token生成できない");

        HttpHeaders responseHeaders = new HttpHeaders();

        responseHeaders.set("Authorization",
                usersService.createToken(usersId));

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body("Response with header using ResponseEntity");


    }
}
