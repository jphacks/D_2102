package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.Comment;
import com.example.jphacks_server.entity.Subject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
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



    public ResponseEntity<String> commentTeacherAnswered(String userId,  HttpHeaders header){

        String query = "select comments.comment_id, subjects.subjects_id, subjects.subjects_name, comments.comment_content, comments.created_at, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered, count(comment_vote.comment_id) as vote\n" +
                "from (comments, users)\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join comment_vote on comments.comment_id = comment_vote.comment_id and comment_vote.comment_vote_is_deleted = 0\n" +
                "where comments.subjects_id in (\n" +
                "  select subjects.subjects_id\n" +
                "  from subjects\n" +
                "  left join course_director on subjects.subjects_id = course_director.subjects_id\n" +
                "  left join users on course_director.users_id = users.users_id\n" +
                "  where users.users_id = ?\n" +
                ")\n" +
                "and comments.users_id = users.users_id\n" +
                "and users.student_group_id is not null\n" +
                "and comments.comment_is_answered != 0\n" +
                "group by comments.comment_id\n" +
                "order by comments.created_at desc";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<Comment> comments = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), Integer.parseInt(userId));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(comments), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }


    public ResponseEntity<String> commentTeacherNotAnswered(String userId,  HttpHeaders header){

        String query = "select comments.comment_id, subjects.subjects_id, subjects.subjects_name, comments.comment_content, comments.created_at, if(comments.comment_is_answered = 0, \"notAnswered\",\"Answered\") as is_answered, count(comment_vote.comment_id) as vote\n" +
                "from (comments, users)\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join comment_vote on comments.comment_id = comment_vote.comment_id and comment_vote.comment_vote_is_deleted = 0\n" +
                "where comments.subjects_id in (\n" +
                "  select subjects.subjects_id\n" +
                "  from subjects\n" +
                "  left join course_director on subjects.subjects_id = course_director.subjects_id\n" +
                "  left join users on course_director.users_id = users.users_id\n" +
                "  where users.users_id = ?\n" +
                ")\n" +
                "and comments.users_id = users.users_id\n" +
                "and users.student_group_id is not null\n" +
                "and comments.comment_is_answered = 0\n" +
                "group by comments.comment_id\n" +
                "order by comments.created_at desc";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<Comment> comments = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), Integer.parseInt(userId));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(comments), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }




    public ResponseEntity<String> commentDetail(String commentId, String usersId, HttpHeaders header){
        String query = "select comments.comment_id, subjects.subjects_id, subjects.subjects_name, users.student_group_id, comments.comment_content, comments.created_at, comments.comment_is_answered, if(comments.comment_is_answered = 0,\"notAnswered\",\"Answered\") as is_answered, if(sum(comment_vote.users_id = ?),\"true\",\"false\") as voted, count(comment_vote.comment_id) as vote\n" +
                "from comments\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join users on comments.users_id = users.users_id\n" +
                "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                "left join comment_vote on comments.comment_id = comment_vote.comment_id and comment_vote.comment_vote_is_deleted = 0\n" +
                "where comments.comment_id = ?\n" +
                "and users.student_group_id is not null\n" +
                "group by comments.comment_id\n" +
                "order by comments.created_at desc";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();

        List<Comment> comment = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Comment.class), Integer.parseInt(usersId) ,commentId);

        try {
            String json = mapper.writeValueAsString(comment);
            JsonNode jsonNode = mapper.readTree(json);
            root.put("student", jsonNode);
        }catch (Exception e){
            e.printStackTrace();
        }

        System.out.println(comment.size());



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

    public ResponseEntity<String> textPair(String commentId, String userId, HttpHeaders header){
        String targetCommentQuery = "select * from comments where comment_id = ?";
        String inspectionQuery = "select comments.comment_id, subjects.subjects_name, users.student_group_id, comments.comment_content, comments.created_at, comments.comment_is_answered, count(comment_vote.comment_id) as vote\n" +
                "from comments\n" +
                "left join subjects on comments.subjects_id= subjects.subjects_id\n" +
                "left join users on comments.users_id = users.users_id \n" +
                "left join student_group on users.student_group_id = student_group.student_group_id\n" +
                "left join comment_vote on comments.comment_id = comment_vote.comment_id and comment_vote.comment_vote_is_deleted = 0\n" +
                "where comments.subjects_id = ?\n" +
                "and comments.comment_id != ?\n" +
                "and student_group.student_group_id = (select student_group_id from users where users_id = ?)\n" +
                "and users.student_group_id is not null\n" +
                "group by comments.comment_id\n" +
                "order by comments.created_at desc";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();

        List<Comment> targetComments = jdbcTemplate.query(targetCommentQuery, new BeanPropertyRowMapper<>(Comment.class), commentId);

        Comment targetComment = targetComments.get(0);

        List<Comment> inspectionComments = jdbcTemplate.query(inspectionQuery,new BeanPropertyRowMapper<>(Comment.class), targetComment.getSubjectsId(), targetComment.getCommentId() ,Integer.parseInt(userId));
        List<Comment> commentResult = new ArrayList<Comment>();

        for(Comment inspectionComment: inspectionComments){
            String strJson = HttpRequest.callPost(targetComment.getCommentContent(), inspectionComment.getCommentContent());
            JSONObject jsonObj = (JSONObject) JSONValue.parse(strJson);
            System.out.println(jsonObj.get("score"));
            if((double)jsonObj.get("score") > 0.80){
                commentResult.add(inspectionComment);
            }
        }

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(commentResult), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseEntity;

    }






}
