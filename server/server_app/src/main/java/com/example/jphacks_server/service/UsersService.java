package com.example.jphacks_server.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jphacks_server.entity.Schools;
import com.example.jphacks_server.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UsersService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Long EXPIRATION_TIME = 1000L * 60L * 10L;

    public List<Users> findAll() {
        // 実行する SQL を組み立てて実行
        String query = "SELECT * from users";
        List<Users> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Users.class));
        return users;
    }

    public String login(String id, String password){
        String query = "SELECT * from users where users_login_id = ? and users_login_password = ?";
        List<Users> users = jdbcTemplate.query(query,new BeanPropertyRowMapper<>(Users.class), id, password);
        String usersId = String.valueOf(users.get(0).getUsersId());
        return usersId;

    }


    public String createToken(String subject) {


        String secretKey = "panda";
        Date issuedAt = new Date();
        Date notBefore = new Date(issuedAt.getTime());
        Date expiresAt = new Date(issuedAt.getTime() + EXPIRATION_TIME);


        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        try {

            String token = JWT.create()
                    // registered claims
                    //.withJWTId("jwtId")        //"jti" : JWT ID
                    //.withAudience("audience")  //"aud" : Audience
                    //.withIssuer("issuer")      //"iss" : Issuer
                    .withSubject(subject)         //"sub" : Subject
                    .withIssuedAt(issuedAt)      //"iat" : Issued At
                    .withNotBefore(notBefore)    //"nbf" : Not Before
                    .withExpiresAt(expiresAt)    //"exp" : Expiration Time
                    //private claims
                    //private claims
//                    .withClaim("X-AUTHORITIES", "aaa")
//                    .withClaim("X-USERNAME", "bbb")
                    .sign(algorithm);
            System.out.println("generate token : " + token);
            return token;
        } catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }
}
