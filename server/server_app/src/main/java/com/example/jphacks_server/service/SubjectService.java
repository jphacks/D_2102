package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.Subject;
import com.example.jphacks_server.entity.Users;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    HttpHeaders responseHeaders = new HttpHeaders();

    @Autowired
    JdbcTemplate jdbcTemplate;

    public SubjectService(){
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
    }

    public ResponseEntity<String> subjectAll(String id, HttpHeaders header){
        String query = "select subjects.subjects_id, subjects.subjects_name\n" +
                "from subjects\n" +
                "left join group_director on subjects.subjects_id = group_director.subjects_id\n" +
                "left join student_group on group_director.student_group_id = student_group.student_group_id\n" +
                "left join users on users.student_group_id = student_group.student_group_id\n" +
                "where users.users_id = ?";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<Subject> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Subject.class), Integer.parseInt(id));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(users), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }



}
