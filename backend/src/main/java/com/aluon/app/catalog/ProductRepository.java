package com.aluon.app.catalog;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {
  List<ProductEntity> findByActiveTrueOrderBySortOrderAscCreatedAtDesc();
}

