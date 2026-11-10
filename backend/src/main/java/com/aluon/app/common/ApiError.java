package com.aluon.app.common;

import java.util.List;

public record ApiError(String type, String title, int status, String detail, List<FieldError> errors) {
  public record FieldError(String field, String message, String code) {}
}

