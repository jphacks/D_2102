package com.example.jphacks_server.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Users;
import com.example.jphacks_server.service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {

    static protected Logger logger = LogManager.getLogger(new Object(){}.getClass());
    HttpHeaders requestHeaders = new HttpHeaders();

    public Controller(){
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UsersService usersService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private NewsService newsService;

    @Autowired
    private CommentService commentService;


    @Autowired
    private LoginService loginService;




    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> loginControl(@RequestBody Users usersData) {
        return loginService.login(usersData);
    }


    @CrossOrigin
    @GetMapping("/user")
    public ResponseEntity<String> userControl(HttpServletRequest httpRequest){
        String responseHeader = httpRequest.getHeader("Authorization");
        String usersId = JwtToken.verify(responseHeader);
        if(!usersId.equals("Exception")){
            requestHeaders.set("Authorization", responseHeader);
            return usersService.findAll(usersId, requestHeaders);
        }else{
            return createFailedJson();
        }
    }

    @CrossOrigin
    @GetMapping("/comment")
    public ResponseEntity<String> commnetControl(HttpServletRequest httpRequest){
        String responseHeader = httpRequest.getHeader("Authorization");
        String usersId = JwtToken.verify(responseHeader);
        if(!usersId.equals("Exception")){
            requestHeaders.set("Authorization", responseHeader);
            return commentService.comentAll(usersId, requestHeaders);
        }else{
            return createFailedJson();
        }
    }

    @CrossOrigin
    @GetMapping("/subject")
    public ResponseEntity<String> subjectControl(HttpServletRequest httpRequest){
        String responseHeader = httpRequest.getHeader("Authorization");
        String usersId = JwtToken.verify(responseHeader);
        if(!usersId.equals("Exception")){
            requestHeaders.set("Authorization", responseHeader);
            return subjectService.subjectAll(usersId, requestHeaders);
        }else{
            return createFailedJson();
        }
    }


    @CrossOrigin
    @GetMapping("/news")
    public ResponseEntity<String> newsControl(HttpServletRequest httpRequest) {
        String responseHeader = httpRequest.getHeader("Authorization");
        String usersId = JwtToken.verify(responseHeader);
        if(!usersId.equals("Exception")){
            return newsService.newsAll(usersId, requestHeaders);
        }else{
            return createFailedJson();
        }
    }

    private ResponseEntity<String> createFailedJson(){
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        root.put("status", "failed");

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(root), HttpStatus.BAD_REQUEST);
        } catch (
                JsonProcessingException e) {
            e.printStackTrace();
        }

        return  responseEntity;
    }

}
