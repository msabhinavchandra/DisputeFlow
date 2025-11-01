package com.disputeflow.disputeflow_backend;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class RequestLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;

        // Get logged-in user (if any)
        String user = request.getRemoteUser();
        if (user == null) user = "ANONYMOUS";

        // Log structured message
System.out.println(String.format(
    "{\"user\":\"%s\",\"method\":\"%s\",\"path\":\"%s\"}",
    user, request.getMethod(), request.getRequestURI()
));


        // Continue to next filter / controller
        chain.doFilter(req, res);
    }
}
