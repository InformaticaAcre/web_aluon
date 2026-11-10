package com.aluon.app.catalog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "product")
public class ProductEntity {
  @Id public UUID id;

  @Column(nullable = false, unique = true, length = 120)
  public String slug;

  @Column(nullable = false, length = 160)
  public String name;

  @Column(name = "short_description", nullable = false, length = 260)
  public String shortDescription;

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

