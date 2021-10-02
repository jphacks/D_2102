package com.example.jphacks_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class JphacksServerApplication {

	@RequestMapping("/")
	public String home() {
		return "Stk World";
	}

	public static void main(String[] args) {
		SpringApplication.run(JphacksServerApplication.class, args);
	}

}
