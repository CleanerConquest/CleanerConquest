package com.example.carpet.services;

import com.example.carpet.models.Customer;
import com.example.carpet.payloads.request.CustomerReq;
import com.example.carpet.repository.CustomerRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class CustomerServImpl implements CustomerServ {

    @Autowired
    private CustomerRepo customerRepository;

    @Override
    public void saveCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAllByIsDeleted(false);
    }

    @Override
    public List<Customer> getCustomerByName(String name) {
        if (name.contains(" ")) {
            String[] names = name.split(" ");
            return customerRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(names[0], names[1], name.length() * 2);
        }
        return customerRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name, name.length() < 5 ? name.length() * 2 : 10);
    }

    @Override
    public Optional<Customer> getCustomerById(long id) {
        return customerRepository.findCustomerByIdAndIsDeleted(id, false);
    }


    @Override
    public void deleteCustomersByIds(List<Long> ids) throws NoSuchElementException {
        List<Customer> customers = customerRepository.findAllById(ids);
        for (Customer customer :
                customers) {
            customer.setDeleted(true);
            customerRepository.save(customer);
        }
    }

    @Override
    public Long getCustomerCountByDate(Timestamp timestamp) {
        return customerRepository.countAllByAddedAtLessThanEqualAndIsDeletedIsFalse(timestamp);
    }

    @Override
    public boolean updateCustomer(Long id, CustomerReq customerReq) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customer
                    .setFirstName(customerReq.getFirstName())
                    .setLastName(customerReq.getLastName())
                    .setPhoneNumber(customerReq.getPhoneNumber())
                    .setEmailAddress(customerReq.getEmailAddress())
                    .setAddress(customerReq.getAddress());
            customerRepository.save(customer);
            return true;
        }
        return false;
    }
}
