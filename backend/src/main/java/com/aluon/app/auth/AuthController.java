package com.aluon.app.auth;

import com.aluon.app.security.JwtService;
import com.aluon.app.user.Role;
import com.aluon.app.user.UserEntity;
import com.aluon.app.user.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final long ttlSeconds;

  public AuthController(
      UserRepository users,
      PasswordEncoder passwordEncoder,
      JwtService jwtService,
      @Value("${app.security.jwt.access-token-ttl-seconds}") long ttlSeconds) {
    this.users = users;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.ttlSeconds = ttlSeconds;
  }

  public record RegisterRequest(
      @Email @NotBlank String email,
      @NotBlank @Size(min = 8, max = 72) String password,
      @NotBlank @Size(max = 200) String fullName) {}

  public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}

  public record AuthResponse(String accessToken, String tokenType, long expiresInSeconds, String role) {}
  public record MeResponse(String email, String role) {}

  @PostMapping("/register")
  public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
    if (users.findByEmailIgnoreCase(req.email()).isPresent()) {
      throw new ErrorResponseException(
          HttpStatus.CONFLICT,
          ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "Ese email ya está registrado."),
          null);
    }
    UserEntity u = new UserEntity();
    u.id = UUID.randomUUID();
    u.email = req.email().trim().toLowerCase();
    u.fullName = req.fullName().trim();
    u.passwordHash = passwordEncoder.encode(req.password());
    u.role = Role.USER;
    u.createdAt = Instant.now();
    users.save(u);

    String token = jwtService.mint(u.email, u.role.name());
    return new AuthResponse(token, "Bearer", ttlSeconds, u.role.name());
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest req) {
    UserEntity u =
        users.findByEmailIgnoreCase(req.email())
            .orElseThrow(
                () ->
                    new ErrorResponseException(
                        HttpStatus.UNAUTHORIZED,
                        ProblemDetail.forStatusAndDetail(
                            HttpStatus.UNAUTHORIZED, "Email o contraseña incorrectos."),
                        null));
    if (!passwordEncoder.matches(req.password(), u.passwordHash)) {
      throw new ErrorResponseException(
          HttpStatus.UNAUTHORIZED,
          ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Email o contraseña incorrectos."),
          null);
    }
    String token = jwtService.mint(u.email, u.role.name());
    return new AuthResponse(token, "Bearer", ttlSeconds, u.role.name());
  }

  @GetMapping("/me")
  public MeResponse me(Authentication auth) {
    if (auth == null) {
      throw new ErrorResponseException(
          HttpStatus.UNAUTHORIZED,
          ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "No autenticado."),
          null);
    }
    String role =
        auth.getAuthorities().stream().findFirst().map(a -> a.getAuthority().replace("ROLE_", "")).orElse("USER");
    return new MeResponse(auth.getName(), role);
  }
}
