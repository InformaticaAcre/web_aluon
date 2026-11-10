package com.aluon.app.security;

import com.aluon.app.common.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(
      HttpSecurity http, JwtAuthFilter jwtAuthFilter, ObjectMapper objectMapper)
      throws Exception {
    http.cors(Customizer.withDefaults());
    http.csrf(csrf -> csrf.disable());
    http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    http.exceptionHandling(
        eh ->
            eh.authenticationEntryPoint(
                    (req, res, ex) -> {
                      res.setStatus(HttpStatus.UNAUTHORIZED.value());
                      res.setContentType(MediaType.APPLICATION_JSON_VALUE);
                      ApiError body =
                          new ApiError(
                              "unauthorized",
                              "No autenticado",
                              HttpStatus.UNAUTHORIZED.value(),
                              "Inicia sesión para continuar.",
                              List.of());
                      objectMapper.writeValue(res.getOutputStream(), body);
                    })
                .accessDeniedHandler(
                    (req, res, ex) -> {
                      res.setStatus(HttpStatus.FORBIDDEN.value());
                      res.setContentType(MediaType.APPLICATION_JSON_VALUE);
                      ApiError body =
                          new ApiError(
                              "forbidden",
                              "No autorizado",
                              HttpStatus.FORBIDDEN.value(),
                              "No tienes permisos para realizar esta acción.",
                              List.of());
                      objectMapper.writeValue(res.getOutputStream(), body);
                    }));

    http.authorizeHttpRequests(
        auth ->
            auth.requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest()
                .authenticated());

    http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
