"use strict"

// constructor function of poke_bowl 
function Portion (name, price, max_protein, max_ingredient, increase_percentage_ingredients) {
    this.name = name;
    this.price = price;
    this.max_protein = max_protein;
    this.max_ingredient = max_ingredient;
    this.increase_percentage_ingredients = increase_percentage_ingredients;
    }

export default Portion;