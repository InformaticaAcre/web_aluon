package com.aluon.app.publicapi;

import com.aluon.app.catalog.PortfolioRepository;
import com.aluon.app.catalog.ProductRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicCatalogController {
  private final ProductRepository products;
  private final PortfolioRepository portfolio;

  public PublicCatalogController(ProductRepository products, PortfolioRepository portfolio) {
    this.products = products;
    this.portfolio = portfolio;
  }

  public record ProductDto(
      UUID id, String slug, String name, String shortDescription, String description, String imageUrl) {}

  public record PortfolioDto(UUID id, String title, String category, String description, String imageUrl) {}

  @GetMapping("/products")
  public List<ProductDto> listProducts() {
    return products.findByActiveTrueOrderBySortOrderAscCreatedAtDesc().stream()
        .map(
            p ->
                new ProductDto(
                    p.id, p.slug, p.name, p.shortDescription, p.description, p.imageUrl))
        .toList();
  }

  @GetMapping("/portfolio")
  public List<PortfolioDto> listPortfolio() {
    return portfolio.findByActiveTrueOrderBySortOrderAscCreatedAtDesc().stream()
        .map(i -> new PortfolioDto(i.id, i.title, i.category, i.description, i.imageUrl))
        .toList();
  }
}

