package com.example.carpet.payloads.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductReq {


    @NotBlank
    public String name;
    @NotBlank
    public String category;

    @NotBlank
    public String description;
    @NotBlank
    public String productUnit;
    @NotBlank
    public String priceUnit;
    @NotNull
    public Double price;
}
