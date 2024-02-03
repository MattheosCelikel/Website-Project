#!/bin/bash
# Create the list
food_list=(
  Apple Banana Orange Grapes Strawberry Watermelon Pineapple Mango Kiwi Blueberries
  Carrot Broccoli Spinach Tomato Potato Bell_pepper Cucumber Cauliflower Zucchini Onion
  Rice Wheat Oats Quinoa Barley Corn Buckwheat Millet Rye Bulgur Chicken Beef
  "Fish (salmon, tuna, cod, etc.)" Eggs Tofu Lentils Chickpeas Beans
  "Nuts (almonds, walnuts, peanuts, etc.)" "Seeds (sunflower seeds, chia seeds, flaxseeds, etc.)"
  Milk "Cheese (cheddar, mozzarella, feta, etc.)" Yogurt Butter Almond_milk Soy_milk
  Coconut_milk Greek_yogurt Cottage_cheese Sour_cream Bread Pasta Bagels Tortillas Pita_bread
  Rice_cakes Naan Croissants "Quinoa pasta" "Whole wheat bread" "Potato chips" Popcorn Pretzels
  "Nuts and seeds mix" "Trail mix" Crackers "Granola bars" "Veggie chips" "Fruit snacks" "Rice cakes"
  Chocolate "Ice cream" Cake Cookies Pie Brownies Pudding Gelato Donuts Sorbet
  Water Coffee Tea Milkshakes "Juice (orange juice, apple juice, etc.)" Smoothies Soda Lemonade
  "Iced tea" "Hot chocolate" Ketchup Mustard Mayonnaise Soy_sauce Olive_oil Vinegar Salsa
  "Hot sauce" "BBQ sauce" Pesto
)

# Get the number of items in the list
num_items=${#food_list[@]}

# Generate a random index
random_index=$((RANDOM % num_items))

# Assign the randomly selected item to a variable
selected_food=${food_list[random_index]}

php_output=$(php /home/bas64/Desktop/IT490-team-champa/database/proceduralDataCollection.php 'foodGenericData' $selected_food)

echo $php_output

php /home/bas64/Desktop/IT490-team-champa/database/proceduralDataCollection.php 'foodDetailedData' $php_output $selected_food

