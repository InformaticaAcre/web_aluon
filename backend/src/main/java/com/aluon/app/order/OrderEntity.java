package com.aluon.app.order;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "customer_order")
public class OrderEntity {
  @Id public UUID id;

  @Column(name = "customer_email", nullable = false, length = 320)
  public String customerEmail;

  @Column(name = "customer_name", nullable = false, length = 200)
  public String customerName;

  @Column(name = "customer_phone", length = 40)
  public String customerPhone;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 40)
  public OrderStatus status;

  @Column(name = "assigned_user_id")
  public UUID assignedUserId;

  @Column(name = "created_at", nullable = false)
  public Instant createdAt;
}
