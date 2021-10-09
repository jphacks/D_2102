package com.example.jphacks_server.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class Controller {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final Long EXPIRATION_TIME = 1000L * 60L * 10L;

    String secretKey = "secret";
    Date issuedAt = new Date();
    Date notBefore = new Date(issuedAt.getTime());
    Date expiresAt = new Date(issuedAt.getTime() + EXPIRATION_TIME);



    @RequestMapping("/")
    public String home() {
        List<Map<String, Object>> schools = jdbcTemplate.queryForList("select * from schools");

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        try {

            String token = JWT.create()
                    // registered claims
                    //.withJWTId("jwtId")        //"jti" : JWT ID
                    //.withAudience("audience")  //"aud" : Audience
                    //.withIssuer("issuer")      //"iss" : Issuer
                    .withSubject("test_password")         //"sub" : Subject
                    .withIssuedAt(issuedAt)      //"iat" : Issued At
                    .withNotBefore(notBefore)    //"nbf" : Not Before
                    .withExpiresAt(expiresAt)    //"exp" : Expiration Time
                    //private claims
                    .withClaim("X-AUTHORITIES", "aaa")
                    .withClaim("X-USERNAME", "bbb")
                    .sign(algorithm);
            System.out.println("generate token : " + token);
            return token;
        } catch (Exception e){
            e.printStackTrace();
        }


        return schools.get(0).toString();
    }
}
