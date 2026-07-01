package com.samudra.identity.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class InternalApiAuthFilter extends OncePerRequestFilter {

    @Value("${samudra.internal.api.token:}")
    private String internalApiToken;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        if (!request.getRequestURI().startsWith("/v1/internal/")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (internalApiToken == null || internalApiToken.isBlank()) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"status\":403,\"message\":\"Internal API token not configured\"}");
            return;
        }
        String provided = request.getHeader("X-Internal-Token");
        if (!internalApiToken.equals(provided)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("{\"status\":403,\"message\":\"Invalid internal token\"}");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
