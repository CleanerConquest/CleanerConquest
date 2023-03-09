package com.example.carpet.controllers;

import com.example.carpet.models.Customer;
import com.example.carpet.models.Product;
import com.example.carpet.models.Worker;
import com.example.carpet.payloads.request.WorkerReq;
import com.example.carpet.services.WorkerServImpl;
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
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/worker")
@CrossOrigin
@SecurityRequirement(name = "Bearer Authentication")
public class WorkerController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private WorkerServImpl workerServ;

    @Operation(summary = "Add New Worker")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Added successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping("/save")
    public @ResponseBody ResponseEntity<?> createWorker(@Valid @RequestBody WorkerReq workerReq) {
        workerServ.saveWorker(Worker.builder()
                .firstName(workerReq.getFirstName())
                .lastName(workerReq.getLastName())
                .phoneNumber(workerReq.getPhoneNumber())
                .address(workerReq.getAddress())
                .employedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build()
        );
        return ResponseEntity.ok("Worker added");
    }

    @Operation(summary = "Get All The Available Worker")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Worker.class)))),
            @ApiResponse(responseCode = "204", description = "No Workers Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/")
    public @ResponseBody ResponseEntity<?> getAllWorkers() {
        List<Worker> workers = workerServ.getAllWorkers();
        if (workers != null && !workers.isEmpty())
            return ResponseEntity.ok(workers);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Get All Workers By Name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Worker.class)))),
            @ApiResponse(responseCode = "204", description = "No Workers Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/byName{name}")
    public @ResponseBody ResponseEntity<?> getWorkerByName(@RequestParam String name) {
        List<Worker> workers = workerServ.getWorkerByName(name);
        if (workers != null && !workers.isEmpty())
            return ResponseEntity.ok(workers);
        return ResponseEntity.status(204).build();
    }
    @Operation(summary = "Get Number Of Workers Before Specific Date")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully"),
            @ApiResponse(responseCode = "204", description = "Zero Workers"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/countByDate{date}")
    public @ResponseBody ResponseEntity<?> getWorkerCountByDate(@RequestParam String date) {
        Timestamp timestamp = Timestamp.valueOf(date + " 00:00:00.000000");
        Long workersCount = workerServ.getWorkerCountByDate(timestamp);
        if (workersCount != null)
            return ResponseEntity.ok(workersCount);
        return ResponseEntity.status(204).build();
    }
    @Operation(summary = "Unemploy Worker Details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Unemployed successfully"),
            @ApiResponse(responseCode = "204", description = "Wrong Worker Id"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @DeleteMapping("/unemploy{id}")
    public @ResponseBody ResponseEntity<?> unemploy(@RequestParam long id) {
        try {
            workerServ.unemployeWorkerById(id);
            return ResponseEntity.ok("Worker Unemployed");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.status(204).body("Worker Not Found");
        }
    }

    @Operation(summary = "Update Worker Details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Updated successfully"),
            @ApiResponse(responseCode = "204", description = "Wrong Worker Id"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PutMapping("/update/{id}")
    public @ResponseBody ResponseEntity<?> updateCustomer(@PathVariable("id") Long id, @RequestBody WorkerReq workerReq) {
        if (workerServ.updateWorker(id, workerReq))
            return ResponseEntity.ok("Customer Updated");
        return ResponseEntity.status(204).build();
    }
}
