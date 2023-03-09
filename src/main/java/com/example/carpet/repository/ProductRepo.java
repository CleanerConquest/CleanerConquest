package com.example.carpet.repository;

import com.example.carpet.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM products WHERE name LIKE %?1% AND is_deleted=0 LIMIT ?2", nativeQuery = true)
    List<Product> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String name, int limit);

    Optional<Product> findProductByIdAndIsDeleted(long id, boolean deleted);

    List<Product> findAllByIsDeleted(boolean deleted);

    List<Product> findAllByIdInAndIsDeleted(List<Long> ids, boolean deleted);
}
