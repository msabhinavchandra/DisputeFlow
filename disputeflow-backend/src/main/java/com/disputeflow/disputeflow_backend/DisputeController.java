package com.disputeflow.disputeflow_backend;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DisputeController {

    private final DisputeRepo repo;

    // CUSTOMER creates a dispute
    @PostMapping("/disputes")
    @PreAuthorize("hasRole('CUSTOMER')")
    public Dispute create(@Valid @RequestBody Dispute d) {
        d.setId(null); // avoids client overriding ids
        d.setStatus(DisputeStatus.OPEN);
        return repo.save(d);
    }

    // CUSTOMER views own disputes
    @GetMapping("/disputes/my/{customerId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<Dispute> mine(@PathVariable Long customerId) {
        return repo.findByCustomerId(customerId);
    }

    // OPS changes status
    @PatchMapping("/disputes/{id}/status")
    @PreAuthorize("hasRole('OPS')")
    public Dispute change(@PathVariable Long id, @RequestParam DisputeStatus status) {
        var d = repo.findById(id).orElseThrow();
        d.setStatus(status);
        return repo.save(d);
    }
}
