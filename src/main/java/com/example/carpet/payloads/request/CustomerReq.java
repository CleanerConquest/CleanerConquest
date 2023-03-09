package com.example.carpet.payloads.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class CustomerReq {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String emailAddress;
    @Nullable
    private String address;
}
