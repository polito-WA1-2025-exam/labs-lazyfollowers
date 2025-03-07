"use strict"

// constructor function of poke_bowl 
function PokeBowl (size, base, ingredients, protein) {
    this.size = size;
    this.base = base; //base
    this.protein = protein; //array of protein
    this.ingredients = ingredients; //array of ingredient
    container_poke_bowl.push(this); //store the object in its container
}


export default PokeBowl;