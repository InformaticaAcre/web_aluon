package com.aluon.app.order;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "order_item")
public class OrderItemEntity {
  @Id public UUID id;

  @Column(name = "order_id", nullable = false)
  public UUID orderId;

  @Column(name = "product_id", nullable = false)
  public UUID productId;

  @Column(nullable = false)
  public int quantity;

  @Column(name = "unit_price_cents", nullable = false)
  public int unitPriceCents;

  @Column(name = "created_at", nullable = false)
  public Instant createdAt;
}

