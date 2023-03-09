package com.example.carpet.services;

import com.example.carpet.models.Customer;
import com.example.carpet.payloads.request.CustomerReq;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public interface CustomerServ {
    void saveCustomer(Customer customer);

    List<Customer> getAllCustomers();

    List<Customer> getCustomerByName(String name);

    Optional<Customer> getCustomerById(long id);


    Long getCustomerCountByDate(Timestamp timestamp);

    void deleteCustomersByIds(List<Long> ids);
    boolean updateCustomer(Long id, CustomerReq customerReq);
}
