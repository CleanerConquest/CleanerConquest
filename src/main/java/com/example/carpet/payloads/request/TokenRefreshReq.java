package com.example.carpet.payloads.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
public class TokenRefreshReq {
  @NotBlank
  private String refreshToken;

}
