package com.example.carpet.services;

import com.example.carpet.models.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductServ {
    void saveProduct(Product product);

    List<Product> getAllActiveProducts();

    Optional<Product> getProductById(Long id);

    List<Product> getProductsByIds(List<Long> ids);

    void deleteProductsByIds(List<Long> ids);
}
