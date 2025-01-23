package com.example.foodOrder.FoodItemMicroservic.Controller;

import com.example.foodOrder.FoodItemMicroservic.Data.Food;
import com.example.foodOrder.FoodItemMicroservic.Service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;


@RestController
@CrossOrigin
public class FoodContorller {


    @Autowired
    private FoodService foodservice;

    private static final String UPLOAD_DIR = System.getProperty("user.home") + "/uploads/";

    public Resource loadImageAsResource(String imageName) throws MalformedURLException {
        Path filePath = Paths.get(UPLOAD_DIR).resolve(imageName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return resource;
        } else {
            throw new RuntimeException();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Food>> getAllFoodItems() {
        List<Food> foodItems = foodservice.getAllFoodItems();
        return new ResponseEntity<>(foodItems, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Food> addFoodItem(@RequestParam("image") MultipartFile file, @RequestParam("productname") String productname, @RequestParam("description") String description,
                                            @RequestParam("category") String category, @RequestParam("price") int price) throws IOException {

        Food food = new Food();
        food.setProductname(productname);
        food.setDescription(description);
        food.setCategory(category);
        food.setPrice(price);

        Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        String fileName = file.getOriginalFilename();
        food.setImage(fileName);

        Path filePath = uploadPath.resolve(Objects.requireNonNull(fileName));
        file.transferTo(filePath.toFile());

        Food savedFoodItem = foodservice.saveFoodItem(food);

        return new ResponseEntity<>(savedFoodItem, HttpStatus.CREATED);
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            Resource resource = loadImageAsResource(imageName);

            String contentType = "image/jpeg"; // Default to JPEG
            try {
                contentType = Files.probeContentType(resource.getFile().toPath());
            } catch (IOException ex) {
                ex.printStackTrace();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @DeleteMapping("/foods/{id}")
    public ResponseEntity<Void> removeImage(@PathVariable Long id) {
        try {
            Food foodItem = foodservice.getFoodItemById(id);
            if (foodItem.getImage() != null) {
                Path filePath = Paths.get(UPLOAD_DIR).resolve(foodItem.getImage()).normalize();
                Files.deleteIfExists(filePath);
                foodItem.setImage(null);
                foodservice.deleteFoodItem(foodItem);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("foods/{id}")
    public ResponseEntity<Food> updateFoodItem(@PathVariable Long id, @RequestBody Food updatedFood) {
        return ResponseEntity.ok(foodservice.updateFoodItem(id, updatedFood));
    }
}
