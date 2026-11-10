package com.aluon.app.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  private final SecretKey key;
  private final String issuer;
  private final long ttlSeconds;

  public JwtService(
      @Value("${app.security.jwt.secret}") String secret,
      @Value("${app.security.jwt.issuer}") String issuer,
      @Value("${app.security.jwt.access-token-ttl-seconds}") long ttlSeconds) {
    if (secret == null || secret.trim().length() < 32) {
      throw new IllegalArgumentException(
          "APP_JWT_SECRET debe tener al menos 32 caracteres (HMAC-SHA256).");
    }
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.issuer = issuer;
    this.ttlSeconds = ttlSeconds;
  }

  public String mint(String subject, String role) {
    Instant now = Instant.now();
    Instant exp = now.plusSeconds(ttlSeconds);
    return Jwts.builder()
        .issuer(issuer)
        .subject(subject)
        .issuedAt(Date.from(now))
        .expiration(Date.from(exp))
        .claim("role", role)
        .signWith(key, Jwts.SIG.HS256)
        .compact();
  }

  public JwtUser parse(String token) {
    var claims =
        Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    String subject = claims.getSubject();
    String role = claims.get("role", String.class);
    return new JwtUser(subject, role == null ? "USER" : role);
  }
}
