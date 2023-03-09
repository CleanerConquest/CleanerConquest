package com.example.carpet.payloads.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
public class OrderReq {
    @NotBlank
    private String name;

    @Nullable
    private Timestamp estimated;

    @NotEmpty
    private List<Long> productsIDs;
    @NotEmpty
    private List<Double> productsQuantities;


    @NotNull
    private Long customerID;
}
