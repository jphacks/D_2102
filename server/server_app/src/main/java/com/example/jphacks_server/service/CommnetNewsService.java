package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.Comment;
import com.example.jphacks_server.entity.CommnetNews;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommnetNewsService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public ResponseEntity<String> comentNewsAll(String id, HttpHeaders header){
        String query = "select users.users_id, users.users_name, cm1.comment_id, subjects.subjects_name, cm2.created_at\n" +
                "from comments as cm1\n" +
                "left join subjects on cm1.subjects_id = subjects.subjects_id\n" +
                "left join comments as cm2 on cm2.comment_id  = cm1.comment_is_answered\n" +
                "left join users on users.users_id = cm2.users_id\n" +
                "where cm1.users_id = ?\n" +
                "and users.users_id is not null\n" +
                "order by cm2.created_at desc;";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<CommnetNews> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(CommnetNews.class), Integer.parseInt(id));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(users), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }
}
