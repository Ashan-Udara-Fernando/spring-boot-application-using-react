package com.example.foodOrder.FoodItemMicroservic.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "fooditem")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FoodID")
    private int foodid;

    @Column(name = "Image")
    private String image;

    @Column(name = "Name")
    private String productname;

    @Column(name = "Description")
    private String description;


    @Column(name = "Category")
    private String category;

    @Column(name = "Price")
    private int price;

    // Getters and setters
    public int getFoodid() {
        return foodid;
    }

    public void setFoodid(int foodid) {
        this.foodid = foodid;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
