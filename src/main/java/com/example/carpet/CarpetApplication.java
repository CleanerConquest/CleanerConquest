package com.example.carpet;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Cleaner Conquest",version = "1.0",description = "The Best Cleaning Service"))
public class CarpetApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarpetApplication.class, args);
    }

}
