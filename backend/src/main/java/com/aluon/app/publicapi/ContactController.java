package com.aluon.app.publicapi;

import com.aluon.app.contact.ContactRequestEntity;
import com.aluon.app.contact.ContactRequestRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/contact")
public class ContactController {
  private final ContactRequestRepository repo;

  public ContactController(ContactRequestRepository repo) {
    this.repo = repo;
  }

  public record ContactRequest(
      @NotBlank @Size(max = 200) String fullName,
      @NotBlank @Size(max = 40) String phone,
      @Email @NotBlank @Size(max = 320) String email,
      @NotBlank @Size(max = 120) String projectType,
      @NotBlank @Size(max = 5000) String description,
      @AssertTrue(message = "Debes aceptar la política de privacidad.") Boolean privacyAccepted) {}

  public record ContactResponse(UUID id) {}

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ContactResponse submit(@Valid @RequestBody ContactRequest req) {
    ContactRequestEntity e = new ContactRequestEntity();
    e.id = UUID.randomUUID();
    e.fullName = req.fullName().trim();
    e.phone = req.phone().trim();
    e.email = req.email().trim().toLowerCase();
    e.projectType = req.projectType().trim();
    e.description = req.description().trim();
    e.privacyAccepted = Boolean.TRUE.equals(req.privacyAccepted());
    e.createdAt = Instant.now();
    repo.save(e);
    return new ContactResponse(e.id);
  }
}
