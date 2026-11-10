package com.aluon.app.publicapi;

import com.aluon.app.catalog.ProductRepository;
import com.aluon.app.order.OrderEntity;
import com.aluon.app.order.OrderItemEntity;
import com.aluon.app.order.OrderItemRepository;
import com.aluon.app.order.OrderRepository;
import com.aluon.app.order.OrderStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/orders")
public class OrderController {
  private final OrderRepository orders;
  private final OrderItemRepository items;
  private final ProductRepository products;

  public OrderController(OrderRepository orders, OrderItemRepository items, ProductRepository products) {
    this.orders = orders;
    this.items = items;
    this.products = products;
  }

  public record OrderItemRequest(@NotNull UUID productId, @Min(1) int quantity) {}

  public record CreateOrderRequest(
      @Email @NotBlank @Size(max = 320) String customerEmail,
      @NotBlank @Size(max = 200) String customerName,
      @Size(max = 40) String customerPhone,
      @NotEmpty List<@Valid OrderItemRequest> items) {}

  public record CreateOrderResponse(UUID id, String status) {}

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @Transactional
  public CreateOrderResponse create(@Valid @RequestBody CreateOrderRequest req) {
    // Defensive: verify product existence
    for (OrderItemRequest item : req.items()) {
      if (!products.existsById(item.productId())) {
        throw new ErrorResponseException(
            HttpStatus.BAD_REQUEST,
            ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Hay productos inválidos en el pedido."),
            null);
      }
    }

    OrderEntity order = new OrderEntity();
    order.id = UUID.randomUUID();
    order.customerEmail = req.customerEmail().trim().toLowerCase();
    order.customerName = req.customerName().trim();
    order.customerPhone = req.customerPhone() == null ? null : req.customerPhone().trim();
    order.status = OrderStatus.CREATED;
    order.createdAt = Instant.now();
    orders.save(order);

    for (OrderItemRequest item : req.items()) {
      OrderItemEntity oi = new OrderItemEntity();
      oi.id = UUID.randomUUID();
      oi.orderId = order.id;
      oi.productId = item.productId();
      oi.quantity = item.quantity();
      oi.unitPriceCents = 0;
      oi.createdAt = Instant.now();
      items.save(oi);
    }

    return new CreateOrderResponse(order.id, order.status.name());
  }
}
