package com.example.jphacks_server.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.UnsupportedEncodingException;
import java.util.Date;

public class JwtToken {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private static final Long EXPIRATION_TIME = 1000L * 60L * 10L;



    public static String createToken(String subject) {

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
                    //.withClaim("X-AUTHORITIES", "aaa")
                    //.withClaim("X-USERNAME", "bbb")
                    .sign(algorithm);
            System.out.println("generate token : " + token);
            return token;
        } catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    public static boolean verify(String token, String id){
        String result = verifyToken(token);
        if(!result.equals("Exception")){
            System.out.println("-----一個め");
            if(result.equals(id)){
                System.out.println("-----2個め");
                return true;
            }
        }

        return false;

    }
    private static String verifyToken(String token){
        try {
            String secretKey = "panda";
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();

            DecodedJWT jwt = verifier.verify(token);

            // registered claims
            String subject = jwt.getSubject();
            Date issuedAt = jwt.getIssuedAt();
            Date notBefore = jwt.getNotBefore();
            Date expiresAt = jwt.getExpiresAt();
            System.out.println("subject : [" + subject + "] issuedAt : [" + issuedAt.toString() + "] notBefore : [" + notBefore.toString() + "] expiresAt : [" + expiresAt.toString() + "]");
            // subject : [test] issuedAt : [Thu Apr 12 13:19:00 JST 2018] notBefore : [Thu Apr 12 13:19:00 JST 2018] expiresAt : [Thu Apr 12 13:29:00 JST 2018]
            // private claim  X-AUTHORITIES : [aaa] X-USERNAME : [bbb]

            return subject;

        } catch (JWTVerificationException e) {
            e.printStackTrace();
            return "Exception";
        }
    }
}
