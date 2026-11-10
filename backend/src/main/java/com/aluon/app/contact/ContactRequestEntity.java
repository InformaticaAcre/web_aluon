package com.aluon.app.contact;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "contact_request")
public class ContactRequestEntity {
  @Id public UUID id;

  @Column(name = "full_name", nullable = false, length = 200)
  public String fullName;

  @Column(nullable = false, length = 40)
  public String phone;

  @Column(nullable = false, length = 320)
  public String email;

  @Column(name = "project_type", nullable = false, length = 120)
  public String projectType;

  @Column(nullable = false, columnDefinition = "text")
  public String description;

  @Column(name = "privacy_accepted", nullable = false)
  public boolean privacyAccepted;

  @Column(name = "created_at", nullable = false)
  public Instant createdAt;
}

