package com.example.carpet.controllers;

import com.example.carpet.models.Customer;
import com.example.carpet.payloads.request.CustomerReq;
import com.example.carpet.services.CustomerServImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/customer")
@CrossOrigin
@SecurityRequirement(name = "Bearer Authentication")
public class CustomerController {
    @Autowired
    private CustomerServImpl customerServ;

    @Operation(summary = "Add New Customer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Added successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping("/save")
    public @ResponseBody ResponseEntity<Object> creatCustomer(@Valid @RequestBody CustomerReq customerReq) {
        customerServ.saveCustomer(Customer.builder()
                .firstName(customerReq.getFirstName())
                .lastName(customerReq.getLastName())
                .phoneNumber(customerReq.getPhoneNumber())
                .emailAddress(customerReq.getEmailAddress())
                .address(customerReq.getAddress())
                .addedAt(Timestamp.valueOf(LocalDateTime.now()))
                .isDeleted(false)
                .build()
        );
        return ResponseEntity.ok("Customer added");
    }

    @Operation(summary = "Get All The Available Customers")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Customer.class)))),
            @ApiResponse(responseCode = "204", description = "No Customers Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/")
    public @ResponseBody ResponseEntity<Object> getAllCustomers() {
        List<Customer> customers = customerServ.getAllCustomers();
        if (customers != null && !customers.isEmpty())
            return ResponseEntity.ok(customers);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Get All Customers By Name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Customer.class)))),
            @ApiResponse(responseCode = "204", description = "No Customers Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/byName{name}")
    public @ResponseBody ResponseEntity<Object> getCustomerByName(@RequestParam String name) {
        List<Customer> customers = customerServ.getCustomerByName(name);
        if (customers != null && !customers.isEmpty())
            return ResponseEntity.ok(customers);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Delete Customers By ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deleted successfully"),
            @ApiResponse(responseCode = "204", description = "One of the customers Not Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @DeleteMapping("/deleteById")
    public @ResponseBody ResponseEntity<Object> deleteCustomerById(@Valid @RequestBody Map<String, Object> map) {
        try {
            List<Integer> ids = (List<Integer>) map.get("ids");
            List<Long> longList = ids.stream()
                    .map(Long::valueOf) //or map to any other type/objects with "e -> new..."
                    .collect(Collectors.toList());
            customerServ.deleteCustomersByIds(longList);
            return ResponseEntity.ok("Customers Deleted");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.status(204).body("One of the customers Not Found");
        }

    }
    @Operation(summary = "Get Number Of Customer Before Specific Date")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully"),
            @ApiResponse(responseCode = "204", description = "Zero Customers"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/countByDate{date}")
    public @ResponseBody ResponseEntity<Object> getCustomerCountByDate(@RequestParam String date) {
        Timestamp timestamp = Timestamp.valueOf(date + " 00:00:00.000000");
        Long customerCount = customerServ.getCustomerCountByDate(timestamp);
        if (customerCount != null && customerCount != 0)
            return ResponseEntity.ok(customerCount);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Update Customer Details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Updated successfully"),
            @ApiResponse(responseCode = "204", description = "Wrong Customer Id"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PutMapping("/update/{id}")
    public @ResponseBody ResponseEntity<Object> updateCustomer(@PathVariable("id") Long id, @RequestBody CustomerReq customerReq) {
        if (customerServ.updateCustomer(id, customerReq))
            return ResponseEntity.ok("Customer Updated");
        return ResponseEntity.status(204).build();
    }
}
