package com.aluon.app.common;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
    List<ApiError.FieldError> errors =
        ex.getBindingResult().getFieldErrors().stream()
            .map(
                fe ->
                    new ApiError.FieldError(
                        fe.getField(),
                        fe.getDefaultMessage() == null ? "Valor inválido" : fe.getDefaultMessage(),
                        fe.getCode() == null ? "invalid" : fe.getCode()))
            .collect(Collectors.toList());

    ApiError body =
        new ApiError(
            "validation_error",
            "Validación",
            HttpStatus.BAD_REQUEST.value(),
            "Revisa los campos marcados.",
            errors);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ApiError> handleIntegrity(DataIntegrityViolationException ex) {
    ApiError body =
        new ApiError(
            "conflict",
            "Conflicto",
            HttpStatus.CONFLICT.value(),
            "La operación viola una restricción de datos (duplicado o referencia).",
            List.of());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ApiError> handleDenied(AccessDeniedException ex) {
    ApiError body =
        new ApiError(
            "forbidden",
            "No autorizado",
            HttpStatus.FORBIDDEN.value(),
            "No tienes permisos para realizar esta acción.",
            List.of());
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(body);
  }

  @ExceptionHandler(ErrorResponseException.class)
  public ResponseEntity<ApiError> handleErrorResponse(ErrorResponseException ex) {
    int status = ex.getStatusCode().value();
    String type =
        switch (status) {
          case 400 -> "bad_request";
          case 401 -> "unauthorized";
          case 403 -> "forbidden";
          case 404 -> "not_found";
          case 409 -> "conflict";
          default -> "error";
        };
    ApiError body =
        new ApiError(
            type,
            "Error",
            status,
            ex.getBody() != null && ex.getBody().getDetail() != null ? ex.getBody().getDetail() : ex.getMessage(),
            List.of());
    return ResponseEntity.status(status).body(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleUnexpected(Exception ex) {
    ApiError body =
        new ApiError(
            "unexpected_error",
            "Error inesperado",
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Ha ocurrido un error inesperado. Inténtalo de nuevo.",
            List.of());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
  }
}
