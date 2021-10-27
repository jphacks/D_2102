package com.example.jphacks_server.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Users;
import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.util.Date;
import java.util.List;

@Service

public class LoginService {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    HttpHeaders responseHeaders = new HttpHeaders();

    public LoginService(){
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
    }



    public ResponseEntity<String> login(Users usersData){
        String query = "SELECT * from users where users_login_id = ? and users_login_password = ?";
        String token = null;

        List<Users> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Users.class), usersData.getUsersLoginId(), usersData.getUsersLoginPassword());


        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();

        if(users.size() != 0){
            String usersId = String.valueOf(users.get(0).getUsersId());

            token = JwtToken.createToken(usersId);
        }

        if(token == null){
            root.put("status", "failed");
            responseHeaders.remove("Authorization");
        }else{
            root.put("status", "success");
            root.put("Authorization", token);
            if(users.get(0).getStudentGroupId() != null){
                root.put("userType", "student");
            }else{
                root.put("userType", "teacher");
            }

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
