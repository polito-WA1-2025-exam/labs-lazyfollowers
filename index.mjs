
import sqlite from 'sqlite3';

import PokeBowl from "./entities/Pokebowl.mjs";
import Protein from "./entities/Protein.mjs";
import Ingredient from "./entities/Ingredient.mjs";
import Order from "./entities/Order.mjs";
import Portion from "./entities/Portion.mjs";
import OrderService from "./service/OrderService.mjs";
import Base from "./entities/Base.mjs";

let poke_1 = new PokeBowl('R');
async function main() {
    try {
        let base = await new Base().fetch_by_id(7);
        console.log(base);
    }
    catch (e) {
        console.error(e);
    }

    //     base.name = 'Pasta';

    //     console.log(base);
    //     try {
    //         await base.update_database();
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
}

main();