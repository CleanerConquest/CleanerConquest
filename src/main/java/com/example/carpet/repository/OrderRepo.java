package com.example.carpet.repository;

import com.example.carpet.models.Order;
import com.example.carpet.models.OrderStatus;
import com.example.carpet.models.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByNameContainingIgnoreCase(String name);

    @Query(value = "SELECT SUM(price) FROM customer LEFT JOIN orders ON customer.id=orders.customer_id where customer.id=?1 AND orders.createdat>?2", nativeQuery = true)
    Float getDiscount(long id, Timestamp timestamp);

    List<Order> findByWorkerAndOrderStatusIn(Worker worker, List<OrderStatus> orderStatus);

    Long countOrdersByCreatedATIsLessThanEqual(Timestamp timestamp);

    Long countOrdersByCreatedATIsLessThanEqualAndOrderStatusIsNot(Timestamp timestamp, OrderStatus orderStatus);

    @Query(value = "SELECT SUM(price) FROM orders WHERE `orders`.`order_status`='COMPLETE'", nativeQuery = true)
    Float sumDoneOrdersPrice(Timestamp timestamp);

    @Query(value = "SELECT SUM(price) FROM orders WHERE `orders`.`order_status`<>'COMPLETE'", nativeQuery = true)
    Float sumUnfinishedOrdersPrice(Timestamp timestamp);
}
