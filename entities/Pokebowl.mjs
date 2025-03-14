"use strict"

import Portion from "./Portion.mjs";

// constructor function of poke_bowl 
function PokeBowl(size) {
    this.id = undefined;
    
    this.price = 0;
    this.base = undefined; //base
    this.protein = []; //array of protein
    this.ingredients = []; //array of ingredient
    let assigned_portion = undefined;
    switch (size) {
        case 'R':
            assigned_portion = new Portion('R',9, 1, 4, 20)
            break
        case 'M':
            assigned_portion = new Portion('M',11, 2, 4, 20)
            break
        case 'L':
            assigned_portion = new Portion('L',14, 3, 6, 20)
            break

        default:
            throw ("taille non trouvée")
    }
    this.portion = assigned_portion

}

export default PokeBowl;