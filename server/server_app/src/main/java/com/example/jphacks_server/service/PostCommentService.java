package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.Comment;
import com.example.jphacks_server.entity.Subject;
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
public class PostCommentService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public ResponseEntity<String> postComment(Comment comment, String id, HttpHeaders header){

        String query = "INSERT INTO comments(\n" +
                "    users_id, subjects_id, comment_content, comment_is_answered\n" +
                ") values(\n" +
                "    ?, ?, ?, 0\n" +
                ")";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        int sqlStatus = jdbcTemplate.update(query, Integer.parseInt(id), comment.getSubjectsId(), comment.getCommentContent());
        if(sqlStatus > 0){
            root.put("status", "success");
        }else{
            root.put("status", "failed");
        }

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(root), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }
}
