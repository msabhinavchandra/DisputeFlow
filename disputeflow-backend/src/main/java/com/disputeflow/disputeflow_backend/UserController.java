package com.disputeflow.disputeflow_backend;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    // Public endpoint (no login needed)
    @GetMapping("/api/health")
    public String health() {
        return "OK";
    }

    // Protected endpoint — requires authentication
    @GetMapping("/api/me")
    public String getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return "Logged in as: " + username + " | Roles: " + roles;
    }
}
