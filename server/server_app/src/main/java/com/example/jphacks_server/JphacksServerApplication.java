package com.example.jphacks_server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import java.util.Map;

@SpringBootApplication
public class JphacksServerApplication {


	public static void main(String[] args) {
		SpringApplication.run(JphacksServerApplication.class, args);
	}

}
