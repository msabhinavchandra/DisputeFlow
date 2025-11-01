package com.disputeflow.disputeflow_backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/status")
    public String status() {
        return "Status: OK";
    }
}
