package com.example.jphacks_server.service;

import com.example.jphacks_server.entity.News;
import com.example.jphacks_server.entity.Users;
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
public class NewsService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public ResponseEntity<String> newsAll(String id, HttpHeaders header){
        String query = "select news.news_id, news.student_group_id, news_subject, news_text,if(news_checked.news_id is not null, \"read\",\"notRead\") as is_read " +
                "from news " +
                "left join news_checked " +
                "on news.news_id = news_checked.news_id and news_checked.users_id  = ? " +
                "order by news.created_at desc;";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode root = mapper.createObjectNode();
        List<News> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(News.class), Integer.parseInt(id));

        ResponseEntity<String> responseEntity = null;
        try {
            responseEntity = new ResponseEntity<String>(mapper.writeValueAsString(users), header, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return responseEntity;

    }
}
