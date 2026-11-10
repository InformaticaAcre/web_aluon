package com.aluon.app.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "app_user")
public class UserEntity {
  @Id public UUID id;

  @Column(nullable = false, unique = true, length = 320)
  public String email;

  @Column(name = "full_name", nullable = false, length = 200)
  public String fullName;

  @Column(name = "password_hash", nullable = false)
  public String passwordHash;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 30)
  public Role role;

  @Column(name = "created_at", nullable = false)
  public Instant createdAt;
}

