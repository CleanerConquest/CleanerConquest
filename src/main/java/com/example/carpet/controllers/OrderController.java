package com.example.carpet.controllers;

import com.example.carpet.models.*;
import com.example.carpet.payloads.request.OrderReq;
import com.example.carpet.services.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/order")
@CrossOrigin
@SecurityRequirement(name = "Bearer Authentication")
public class OrderController {
    @Autowired
    private OrderServImpl orderServ;
    @Autowired
    private WorkerServImpl workerServ;
    @Autowired
    private CustomerServImpl customerServ;
    @Autowired
    private ProductServImpl productServ;
    @Autowired
    private EmailService emailService;

    @Operation(summary = "Add New Order")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Added successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping("/save")
    public @ResponseBody ResponseEntity<Object> creatOrder(@Valid @RequestBody OrderReq orderReq) {
        if (orderReq.getProductsIDs().size() != orderReq.getProductsQuantities().size())
            return ResponseEntity.badRequest().body("one of products doesn't have any quantity");
        Worker worker = workerServ.getWorkerWithLeastNumberOfOrders();
        int discount = orderServ.getDiscount(orderReq.getCustomerID());
        Customer customer = customerServ.getCustomerById(orderReq.getCustomerID()).get();
        List<Product> products = productServ.getProductsByIds(orderReq.getProductsIDs()).stream().toList();
        List<Double> productsQuantities = orderReq.getProductsQuantities();
        double finalCalculatedPrice = 0.0;
        for (int index = 0; index < products.size(); index++) {
            finalCalculatedPrice += products.get(index).getPrice() * productsQuantities.get(index);
        }
        finalCalculatedPrice *= ((1) - discount / 100f);
        Order order = Order.builder()
                .name(orderReq.getName())
                .customer(customer)
                .worker(worker)
                .estimated(orderReq.getEstimated() == null ? Timestamp.valueOf(LocalDateTime.now().plusWeeks(1)) : orderReq.getEstimated())
                .price(finalCalculatedPrice)
                .products(products)
                .productsQuantities(orderReq.getProductsQuantities())
                .discount(discount)
                .build();
        orderServ.saveOrder(order);
        return ResponseEntity.ok(order);
    }

    @Operation(summary = "Get All The Available Orders")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Order.class)))),
            @ApiResponse(responseCode = "204", description = "No Orders Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/")
    public @ResponseBody ResponseEntity<Object> getAllOrders() {
        List<Order> orders = orderServ.getAllOrders();
        if (orders != null && !orders.isEmpty())
            return ResponseEntity.ok(orders);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Get All Orders By Name")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Customer.class)))),
            @ApiResponse(responseCode = "204", description = "No Orders Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/byName{name}")
    public @ResponseBody ResponseEntity<Object> getOrderByName(@RequestParam String name) {
        List<Order> orders = orderServ.getOrderByName(name);
        if (orders != null && !orders.isEmpty())
            return ResponseEntity.ok(orders);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Update Order Status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Updated successfully",
                    content = @Content(schema = @Schema(implementation = Order.class))),
            @ApiResponse(responseCode = "204", description = "Wrong Order Id"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/updateStatus{id}")
    public @ResponseBody ResponseEntity<Object> updateOrderStatus(@RequestParam long id) {
        Optional<Order> orderOptional = orderServ.getOrderById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            if (order.getOrderStatus() == OrderStatus.WAITING) order.setOrderStatus(OrderStatus.IN_TREATMENT);
            else if (order.getOrderStatus() == OrderStatus.IN_TREATMENT) {
                order.setOrderStatus(OrderStatus.COMPLETE);
                order.setFinishedAt(Timestamp.valueOf(LocalDateTime.now()));
                emailService.sendOrderStateEmail(order.getCustomer().getEmailAddress(), order);
            }
            orderServ.saveOrder(order);
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Get Number Of Orders Before Specific Date")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully"),
            @ApiResponse(responseCode = "204", description = "Zero Orders"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/countByDate{date}")
    public @ResponseBody ResponseEntity<Object> getOrdersCount(@RequestParam String date) {
        Timestamp timestamp = Timestamp.valueOf(date + " 00:00:00.000000");
        Long ordersCount = orderServ.getOrdersCount(timestamp);
        if (ordersCount != null && ordersCount != 0)
            return ResponseEntity.ok(ordersCount);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Get Number Of Unfinished Orders Before Specific Date")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully"),
            @ApiResponse(responseCode = "204", description = "Zero Orders"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/countUnfinished{date}")
    public @ResponseBody ResponseEntity<Object> getUnfinishedOrdersCount(@RequestParam String date) {
        Timestamp timestamp = Timestamp.valueOf(date + " 00:00:00.000000");
        Long ordersCount = orderServ.getUnfinishedOrdersCount(timestamp, OrderStatus.COMPLETE);
        if (ordersCount != null && ordersCount != 0)
            return ResponseEntity.ok(ordersCount);
        return ResponseEntity.status(204).build();
    }
    @Operation(summary = "Money Gained From Finished Orders Before Specific Date")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully"),
            @ApiResponse(responseCode = "204", description = "Zero Orders"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/sumFinishedByDate{date}")
    public @ResponseBody ResponseEntity<Object> getFinishedOrdersSum(@RequestParam String date) {
        Timestamp timestamp = Timestamp.valueOf(date + " 00:00:00.000000");
        Float sum = orderServ.getSumDoneOrdersPrice(timestamp);
        if (sum != null && sum != 0)
            return ResponseEntity.ok(sum);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Money Expected From Unfinished Orders Before Specific Date")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully"),
            @ApiResponse(responseCode = "204", description = "Zero Orders"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/sumUnfinishedByDate{date}")
    public @ResponseBody ResponseEntity<Object> getUnfinishedOrdersSum(@RequestParam String date) {
        Timestamp timestamp = Timestamp.valueOf(date + " 00:00:00.000000");
        Float sum = orderServ.sumUnfinishedOrdersPrice(timestamp);
        if (sum != null && sum != 0)
            return ResponseEntity.ok(sum);
        return ResponseEntity.status(204).build();
    }
}
