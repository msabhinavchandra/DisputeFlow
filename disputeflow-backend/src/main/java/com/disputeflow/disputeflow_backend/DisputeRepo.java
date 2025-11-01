package com.disputeflow.disputeflow_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DisputeRepo extends JpaRepository<Dispute, Long> {
    List<Dispute> findByCustomerId(Long customerId);
}
