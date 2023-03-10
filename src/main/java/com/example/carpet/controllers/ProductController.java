package com.example.carpet.controllers;

import com.example.carpet.models.Customer;
import com.example.carpet.models.Product;
import com.example.carpet.payloads.request.ProductReq;
import com.example.carpet.services.ProductServImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
@CrossOrigin
@SecurityRequirement(name = "Bearer Authentication")
public class ProductController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    @Value("${app.upoadDir}")
    private String uploadFolder;
    @Autowired
    private ProductServImpl productService;

    @Operation(summary = "Add New Product AS Json (No Image Required)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Added successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping("/saveJson")
    public @ResponseBody ResponseEntity<?> addProductFromJson(@RequestBody ProductReq productReq) {
        return addProduct(productReq.name, productReq.category, productReq.description, productReq.productUnit, productReq.priceUnit, productReq.price, null, null);
    }

    @Operation(summary = "Add New Product From Form")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Added successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @PostMapping(path = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public @ResponseBody ResponseEntity<?> addProduct(@RequestParam String name, @RequestParam String category, @RequestParam String description, @RequestParam String productUnit, @RequestParam String priceUnit, @RequestParam Double price, @RequestPart(required = false) MultipartFile file, HttpServletRequest request) {
        try {
            byte[] imageData = new byte[0];
            if (file != null && !file.isEmpty()) {
                String uploadDirectory = request.getServletContext().getRealPath(uploadFolder);
                log.info("uploadDirectory:: " + uploadDirectory);
                String fileName = file.getOriginalFilename();
                String filePath = Paths.get(uploadDirectory, fileName).toString();
                log.info("FileName: " + file.getOriginalFilename());
                if (fileName == null || fileName.contains("..")) {
                    return ResponseEntity.badRequest().body("Sorry! Filename contains invalid path sequence " + fileName);
                }
                Date createDate = new Date();
                log.info("Name: " + name + " " + filePath);
                log.info("description: " + description);
                log.info("category: " + category);
                try {
                    File dir = new File(uploadDirectory);
                    if (!dir.exists()) {
                        log.info("Folder Created");
                        dir.mkdirs();
                    }
                    // Save the file locally
                    BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
                    stream.write(file.getBytes());
                    stream.close();
                } catch (Exception e) {
                    log.info("in catch");
                    e.printStackTrace();
                }
                imageData = file.getBytes();
            }
            Product product = Product.builder()
                    .name(name)
                    .image(imageData)
                    .description(description)
                    .category(category)
                    .price(price)
                    .productUnit(productUnit)
                    .priceUnit(priceUnit)
                    .isDeleted(false)
                    .build();
            productService.saveProduct(product);
            log.info("HttpStatus===" + new ResponseEntity<>(HttpStatus.OK));
            return new ResponseEntity<>("Product Saved", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("Exception: " + e);
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(summary = "Get Product Image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully"),
            @ApiResponse(responseCode = "204", description = "Wrong Product ID"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/display/{id}")
    @ResponseBody
    void showImage(@PathVariable("id") Long id, HttpServletResponse response) throws IOException {
        log.info("Product image been requested Id number :: " + id);
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
            response.getOutputStream().write(product.get().getImage());
            response.getOutputStream().close();
        } else {
            response.setStatus(204);
            response.getOutputStream().write("product not found".getBytes());
            response.getOutputStream().close();
        }
    }
    @Operation(summary = "Get Product Details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
            content = @Content(schema = @Schema(implementation = Product.class))),
            @ApiResponse(responseCode = "204", description = "Wrong Product ID"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/details{id}")
    public @ResponseBody ResponseEntity<?> showProductDetails(@RequestParam("id") Long id) {
        try {
            log.info("Id :: " + id);
            if (id != 0) {
                Optional<Product> product = productService.getProductById(id);

                log.info("products :: " + product);
                if (product.isPresent()) {

                    return ResponseEntity.ok(product);
                }
                return ResponseEntity.status(204).build();
            }
            return ResponseEntity.status(204).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(204).build();
        }
    }
    @Operation(summary = "Get All The Available Products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Done successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Product.class)))),
            @ApiResponse(responseCode = "204", description = "No Products Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @GetMapping("/")
    public @ResponseBody ResponseEntity<?> getAllProducts() {
        List<Product> products = productService.getAllActiveProducts();
        if (products != null && !products.isEmpty()) return ResponseEntity.ok(products);
        return ResponseEntity.status(204).build();
    }

    @Operation(summary = "Delete Products By ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deleted successfully"),
            @ApiResponse(responseCode = "204", description = "One of the Product Not Found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "not found",
                    content = @Content)})
    @DeleteMapping("/deleteById")
    public @ResponseBody ResponseEntity<?> deleteProductById(@Valid @RequestBody Map<String, Object> map) {
        try {
            List<Integer> ids = (List<Integer>) map.get("ids");
            List<Long> longList = ids.stream().map(Long::valueOf) //or map to any other type/objects with "e -> new..."
                    .collect(Collectors.toList());
            productService.deleteProductsByIds(longList);
            return ResponseEntity.ok("Product Deleted");
        } catch (NoSuchElementException exception) {
            return ResponseEntity.status(204).body("One of the products Not Found");
        }
    }
}