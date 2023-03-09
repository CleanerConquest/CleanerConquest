package com.example.carpet.services;

import com.example.carpet.models.Product;
import com.example.carpet.repository.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class ProductServImpl implements ProductServ {

    @Autowired
    private ProductRepo productRepository;

    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public List<Product> getAllActiveProducts() {
        return productRepository.findAllByIsDeleted(false);
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> getProductsByIds(List<Long> ids) {
        return productRepository.findAllByIdInAndIsDeleted(ids, false);
    }

    @Override
    public void deleteProductsByIds(List<Long> ids) throws NoSuchElementException {
        List<Product> products = productRepository.findAllById(ids);
        for (Product product :
                products) {
            product.setDeleted(true);
            productRepository.save(product);
        }
    }
}