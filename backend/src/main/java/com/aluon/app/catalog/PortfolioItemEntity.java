package com.aluon.app.catalog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "portfolio_item")
public class PortfolioItemEntity {
  @Id public UUID id;

  @Column(nullable = false, length = 180)
  public String title;

  @Column(nullable = false, length = 80)
  public String category;

  @Column(nullable = false, columnDefinition = "text")
  public String description;

  @Column(name = "image_url", columnDefinition = "text")
  public String imageUrl;

  @Column(nullable = false)
  public boolean active;

  @Column(name = "sort_order", nullable = false)
  public int sortOrder;

  @Column(name = "created_at", nullable = false)
  public Instant createdAt;
}

