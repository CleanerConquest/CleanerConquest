package com.example.carpet.services;

import com.example.carpet.models.Order;
import com.example.carpet.models.OrderStatus;
import com.example.carpet.repository.OrderRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServImpl implements OrderServ {

    @Autowired
    private OrderRepo orderRepository;

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrderByName(String name) {
        return orderRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Optional<Order> getOrderById(long id) {
        return orderRepository.findById(id);
    }

    @Override
    public Integer getDiscount(long id) {
        Float amount= orderRepository.getDiscount(id, Timestamp.valueOf(LocalDateTime.now().minusMonths(3)));
        if ( amount==null || amount< 100) {
            return 0;
        }
        return 0;
    }

    @Override
    public Long getOrdersCount(Timestamp timestamp) {
        return orderRepository.countOrdersByCreatedATIsLessThanEqual(timestamp);
    }

    @Override
    public Long getUnfinishedOrdersCount(Timestamp timestamp, OrderStatus orderStatus) {
        return orderRepository.countOrdersByCreatedATIsLessThanEqualAndOrderStatusIsNot(timestamp, orderStatus);
    }

    @Override
    public Float getSumDoneOrdersPrice(Timestamp timestamp) {
        return orderRepository.sumDoneOrdersPrice(timestamp);
    }

    @Override
    public Float sumUnfinishedOrdersPrice(Timestamp timestamp) {
        return orderRepository.sumUnfinishedOrdersPrice(timestamp);
    }
}
