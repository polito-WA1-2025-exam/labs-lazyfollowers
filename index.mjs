
import sqlite from 'sqlite3';

import PokeBowl from "./entities/Poke.mjs";
import Protein from "./entities/Protein.mjs";
import Ingredient from "./entities/Ingredient.mjs";
import Order from "./entities/Order.mjs";
import Portion from "./entities/Portion.mjs";
import OrderService from "./service/OrderService.mjs";
import Base from "./entities/Base.mjs";

async function main() {
    try {
        let poke1 = new PokeBowl('R');
        poke1.base_id = 1; //rice
        poke1.protein_ids = [2, 1]; //tofu, tuna
        poke1.ingredient_ids = [1, 2]; //avocado, ananas
        poke1.portion_id = 1; //regular
        poke1.price = 9.0;
        // poke1.insert_pokebowl();
        console.log(poke1);


    } catch (error) {
        console.log(error);
    }
}
main();