package com.example.foodOrder.FoodItemMicroservic.Data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepousitory
        extends JpaRepository<Food, Long> {
}
