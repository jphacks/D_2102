package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.Comment;
import com.example.jphacks_server.entity.Subject;
import com.example.jphacks_server.entity.Vote;
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
import java.util.Map;

@Service
public class PostCommentService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    CommentService commentService;

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
            return commentService.comentAll(id, header);
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

    public ResponseEntity<String> postVote(Vote vote, String id, HttpHeaders header){

        String query = "INSERT INTO comment_vote(\n" +
                "    comment_id, users_id, comment_vote_is_deleted\n" +
                ") values(\n" +
                "    ?, ?, 0\n" +
                ");";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        int sqlStatus = jdbcTemplate.update(query, vote.getCommentId(), Integer.parseInt(id));
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


    public ResponseEntity<String> postReplyComment(Comment comment, String id, HttpHeaders header){

        String query = "INSERT INTO comments(\n" +
                "    users_id, subjects_id, comment_content, comment_is_answered\n" +
                ") values(\n" +
                "    ?, ?, ?, 0\n" +
                ")";

        String updateQuery = "UPDATE comments SET comment_is_answered = ? where comment_id = ?";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        int sqlStatus = jdbcTemplate.update(query, Integer.parseInt(id), comment.getSubjectsId(), comment.getCommentContent());
        if(sqlStatus > 0){
            List<Map<String, Object>> lastId =  jdbcTemplate.queryForList("SELECT LAST_INSERT_ID() as last_id");
            System.out.println(lastId.get(0).get("last_id"));
            jdbcTemplate.update(updateQuery, lastId.get(0).get("last_id"), comment.getCommentIsAnswered());
            return commentService.commentDetail(String.valueOf(comment.getCommentIsAnswered()), id, header);
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
