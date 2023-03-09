package com.example.carpet.repository;

import com.example.carpet.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
    @Query(value = "select * from customer where (first_name like %?1% or last_name like %?2% )and is_deleted=0 limit ?3", nativeQuery = true)
    List<Customer> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName, int limit);

    Optional<Customer> findCustomerByIdAndIsDeleted(long id, boolean deleted);

    List<Customer> findAllByIsDeleted(boolean isDeleted);

    Long countAllByAddedAtLessThanEqualAndIsDeletedIsFalse(Timestamp timestamp);
}
