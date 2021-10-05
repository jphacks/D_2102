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
@RestController
public class JphacksServerApplication {

	@Autowired
	JdbcTemplate jdbcTemplate;

	@RequestMapping("/")
	public String home() {
		List<Map<String, Object>> schools = jdbcTemplate.queryForList("select * from schools");
		return schools.get(0).toString();
	}

	public static void main(String[] args) {
		SpringApplication.run(JphacksServerApplication.class, args);
	}

}
