package com.example.jphacks_server.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Schools;
import com.example.jphacks_server.entity.Users;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UsersService {

    HttpHeaders responseHeaders = new HttpHeaders();

    @Autowired
    JdbcTemplate jdbcTemplate;

    public UsersService(){
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
    }



    public ResponseEntity<String> findAll(String id, HttpHeaders header){

        String query = "select users.users_id, users.users_name, users.schools_id, schools.schools_name, student_group.student_group_id, student_group.student_group_name, student_group.student_group_grade from users left join schools on users.schools_id = schools.schools_id left join student_group on users.student_group_id = student_group.student_group_id where users.users_id = ?";


        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<Users> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Users.class), Integer.parseInt(id));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(users), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }

    public ResponseEntity<String> findTeacherAll(String id, HttpHeaders header){

        String query = "select users.users_id, users.users_name, users.schools_id, schools.schools_name from users left join schools on users.schools_id = schools.schools_id where users.users_id = ?";


        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<Users> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Users.class), Integer.parseInt(id));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(users), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }



}
