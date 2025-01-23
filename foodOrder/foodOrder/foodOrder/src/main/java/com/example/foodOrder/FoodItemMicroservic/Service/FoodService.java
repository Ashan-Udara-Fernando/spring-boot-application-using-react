package com.example.foodOrder.FoodItemMicroservic.Service;

import com.example.foodOrder.FoodItemMicroservic.Data.Food;
import com.example.foodOrder.FoodItemMicroservic.Data.FoodRepousitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepousitory foodRepousitory;

    // Get all food items
    public List<Food> getAllFoodItems() {
        return foodRepousitory.findAll();
    }

    // Save a new food item
    public Food saveFoodItem(Food food) {
        return foodRepousitory.save(food);
    }

    // Get food item by ID
    public Food getFoodItemById(Long id) {
        return foodRepousitory.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found"));
    }

    // Delete food item by entity
    public void deleteFoodItem(Food food) {
        foodRepousitory.delete(food);
    }

    // Update food item by ID
    public Food updateFoodItem(Long id, Food updatedFood) {
        return foodRepousitory.findById(id)
                .map(existingFood -> {
                    existingFood.setProductname(updatedFood.getProductname());
                    existingFood.setDescription(updatedFood.getDescription());
                    existingFood.setCategory(updatedFood.getCategory());
                    existingFood.setPrice(updatedFood.getPrice());
                    existingFood.setImage(updatedFood.getImage());
                    return foodRepousitory.save(existingFood);
                })
                .orElseThrow(() -> new RuntimeException("Food item not found"));
    }
}
