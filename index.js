
import sqlite from 'sqlite3';

import PokeBowl from "./entities/Poke.mjs";
import Protein from "./entities/Protein.mjs";
import Ingredient from "./entities/Ingredient.mjs";
import Order from "./entities/Order.mjs";
import Portion from "./entities/Portion.mjs";
import OrderService from "./service/OrderService.mjs";
import Base from "./entities/Base.mjs";
import PokeIngredients from "./contents/PokeIngredients.mjs";
import PokeProteins from "./contents/PokeProteins.mjs";

async function main() {
    // try {
    //     let poke1 = new PokeBowl('R');
    //     poke1.base_id = 1; //rice
    //     poke1.protein_ids = [2, 1]; //tofu, tuna
    //     poke1.ingredient_ids = [1, 2]; //avocado, ananas
    //     poke1.portion_id = 1; //regular
    //     poke1.price = 9.0;
    //     // poke1.insert_pokebowl();
    //     console.log(poke1);


    // } catch (error) {
    //     console.log(error);
    // }

    // // delete protein
    // let protein_list = new PokeProteins();
    // protein_list.delete_protein(5).catch((err) => {console.log(err)});
    
    // fetch ingredient
    // let protein_list = new PokeProteins();
    // let new_protein_list = await protein_list.fetch_by_poke_id(1).catch((err) => {console.log(err)});
    // console.log(new_protein_list);
    
    // insert ingredient
    // let protein_list = new PokeProteins();
    // protein_list.insert_protein(1,2).catch((err) => {console.log(err)});

}
main();