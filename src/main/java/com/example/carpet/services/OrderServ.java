package com.example.carpet.services;

import com.example.carpet.models.Order;
import com.example.carpet.models.OrderStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public interface OrderServ {
    void saveOrder(Order order);

    List<Order> getAllOrders();

    List<Order> getOrderByName(String name);

    Optional<Order> getOrderById(long id);

    Integer getDiscount(long id);

    Long getOrdersCount(Timestamp timestamp);

    Long getUnfinishedOrdersCount(Timestamp timestamp, OrderStatus orderStatus);

    Float getSumDoneOrdersPrice(Timestamp timestamp);

    Float sumUnfinishedOrdersPrice(Timestamp timestamp);
}
