
import sqlite from 'sqlite3';

import PokeBowl from "./entities/Pokebowl.mjs";
import Protein from "./entities/Protein.mjs";
import Ingredient from "./entities/Ingredient.mjs";
import Order from "./entities/Order.mjs";
import Portion from "./entities/Portion.mjs";
import OrderService from "./service/OrderService.mjs";

const db = new sqlite.Database('data.sqlite');

// let poke_1 = new PokeBowl('R');
// poke_1.base = new Ingredient('Riz');
// poke_1.protein.push(new Protein('Thon'));
// poke_1.protein.push(new Protein('Saumon'));
// poke_1.ingredients.push(new Ingredient('Concombre'));
// poke_1.ingredients.push(new Ingredient('Avocat'));
// poke_1.ingredients.push(new Ingredient('Mangue'));

// console.log(poke_1);