package com.samudra.common.auction.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PlaceBidRequest(
        @NotNull @DecimalMin("0.01") BigDecimal amount
) {}
