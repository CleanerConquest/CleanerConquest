package com.example.carpet.payloads.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class WorkerReq {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    @NotBlank
    private String phoneNumber;
    @NotBlank
    private String address;
}
