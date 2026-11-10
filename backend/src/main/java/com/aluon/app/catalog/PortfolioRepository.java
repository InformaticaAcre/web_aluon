package com.aluon.app.catalog;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<PortfolioItemEntity, UUID> {
  List<PortfolioItemEntity> findByActiveTrueOrderBySortOrderAscCreatedAtDesc();
}

