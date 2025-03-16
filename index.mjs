
import sqlite from 'sqlite3';

import PokeBowl from "./entities/Pokebowl.mjs";
import Protein from "./entities/Protein.mjs";
import Ingredient from "./entities/Ingredient.mjs";
import Order from "./entities/Order.mjs";
import Portion from "./entities/Portion.mjs";
import OrderService from "./service/OrderService.mjs";
import Base from "./entities/Base.mjs";

const db = new sqlite.Database('data.sqlite');

let poke_1 = new PokeBowl('R');
let base = new Base('Rim');

try {
    base.update_database();
}
catch (e) {
    console.error(e);
}
base.insert_into_database();
