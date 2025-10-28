package com.example.demo.security;

import com.example.demo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
public class TokenProvider {

    private final SecretKey key = Jwts.SIG.HS256.key().build(); // 서명할 때 사용할 무작위 키 생성

    public String create(User user) {
        log.info("key: {}", Base64.getEncoder().encodeToString(key.getEncoded()));
        final Date expirationDate = Date.from(
                Instant.now()
                        .plus(1, ChronoUnit.DAYS)
        );

        return Jwts.builder()
                .signWith(key) // 서명에 사용할 키
                // *** payload *** //
                .subject(user.getId().toString()) // 유일 식별자
                .issuer("demo app") // 토큰 발행 주체
                .issuedAt(new Date()) // 토큰 발행일
                .expiration(expirationDate) // 토큰 만료일
                .compact();
    }

    public String validateAndGetUserId(String token) {
        log.info("token: {}", token);
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject(); // 고유 식별자 반환
    }
}
