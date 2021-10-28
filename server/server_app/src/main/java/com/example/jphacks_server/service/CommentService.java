package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.Comment;
import com.example.jphacks_server.entity.Subject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CommentService {

    HttpHeaders responseHeaders = new HttpHeaders();

    @Autowired
    JdbcTemplate jdbcTemplate;

    public CommentService(){
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
    }

    public ResponseEntity<String> comentAll(String id, HttpHeaders header){
        String query = "select comments.comment_id, comments.subjects_id, subjects.subjects_name, comments.comment_content, comments.created_at, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered\n" +
                "from comments\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join users on  comments.users_id= users.users_id\n" +
                "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                "where student_group.student_group_id = (select student_group_id from users where users_id = ?)\n" +
                "and subjects.subject_one_to_one = 0\n" +
                "order by comments.created_at desc;";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<Comment> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), Integer.parseInt(id));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(users), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }

    public ResponseEntity<String> comentSubjectRoom(String userId, String subjectId, HttpHeaders header){
        String query = "select comments.comment_id, subjects.subjects_name, users.student_group_id, comments.comment_content, comments.created_at, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered, count(comment_vote.comment_id) as vote\n" +
                "from comments\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join users on comments.users_id = users.users_id \n" +
                "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                "left join comment_vote on comments.comment_id = comment_vote.comment_id and comment_vote.comment_vote_is_deleted = 0\n" +
                "where comments.subjects_id = ?\n" +
                "and student_group.student_group_id = (select student_group_id from users where users_id = ?)\n" +
                "and users.student_group_id is not null\n" +
                "group by comments.comment_id\n" +
                "order by comments.created_at desc;";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<Comment> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), Integer.parseInt(subjectId), Integer.parseInt(userId));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(users), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }



    public ResponseEntity<String> commentDetail(String commentId, HttpHeaders header){
        String query = "select comments.comment_id, subjects.subjects_name, users.student_group_id, comments.comment_content, comments.created_at, comments.comment_is_answered, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered, count(comment_vote.comment_id) as vote\n" +
                "from comments\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join users on comments.users_id = users.users_id \n" +
                "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                "left join comment_vote on comments.comment_id = comment_vote.comment_id and comment_vote.comment_vote_is_deleted = 0\n" +
                "where comments.comment_id = ?\n" +
                "and users.student_group_id is not null\n" +
                "group by comments.comment_id\n" +
                "order by comments.created_at desc;";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();

        List<Comment> comment = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), commentId);

        try {
            String json = mapper.writeValueAsString(comment);
            JsonNode jsonNode = mapper.readTree(json);
            root.put("student", jsonNode);
        }catch (Exception e){
            e.printStackTrace();
        }



        int nextComment = comment.get(0).getCommentIsAnswered();
        System.out.println(nextComment);
        if(nextComment != 0){
            query = "select comments.comment_id, users.users_name, comments.comment_content, comments.created_at, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered\n" +
                    "from comments\n" +
                    "left join users on comments.users_id = users.users_id \n" +
                    "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                    "where comments.comment_id = ?\n" +
                    "and users.student_group_id is null\n" +
                    "order by comments.created_at desc";

            comment = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), nextComment);
            try {
                String json = mapper.writeValueAsString(comment);
                JsonNode jsonNode = mapper.readTree(json);
                root.put("teacher", jsonNode);
            }catch (Exception e){
                e.printStackTrace();
            }

        }


        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(root), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }

    public ResponseEntity<String> textPair(String commentId, HttpHeaders header){
        String query = "select comments.comment_id, subjects.subjects_name, users.student_group_id, comments.comment_content, comments.created_at, comments.comment_is_answered, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered, count(comment_vote.comment_id) as vote\n" +
                "from comments\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join users on comments.users_id = users.users_id \n" +
                "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                "left join comment_vote on comments.comment_id = comment_vote.comment_id and comment_vote.comment_vote_is_deleted = 0\n" +
                "where comments.comment_id = ?\n" +
                "and users.student_group_id is not null\n" +
                "group by comments.comment_id\n" +
                "order by comments.created_at desc;";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();

        List<Comment> comment = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), commentId);

        try {
            String json = mapper.writeValueAsString(comment);
            JsonNode jsonNode = mapper.readTree(json);
            root.put("student", jsonNode);
        }catch (Exception e){
            e.printStackTrace();
        }



        int nextComment = comment.get(0).getCommentIsAnswered();
        System.out.println(nextComment);
        if(nextComment != 0){
            query = "select comments.comment_id, users.users_name, comments.comment_content, comments.created_at, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered\n" +
                    "from comments\n" +
                    "left join users on comments.users_id = users.users_id \n" +
                    "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                    "where comments.comment_id = ?\n" +
                    "and users.student_group_id is null\n" +
                    "order by comments.created_at desc";

            comment = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), nextComment);
            try {
                String json = mapper.writeValueAsString(comment);
                JsonNode jsonNode = mapper.readTree(json);
                root.put("teacher", jsonNode);
            }catch (Exception e){
                e.printStackTrace();
            }

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
