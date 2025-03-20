
import sqlite from 'sqlite3';

import PokeBowl from "./entities/Pokebowl.mjs";
import Protein from "./entities/Protein.mjs";
import Ingredient from "./entities/Ingredient.mjs";
import Order from "./entities/Order.mjs";
import Portion from "./entities/Portion.mjs";
import OrderService from "./service/OrderService.mjs";
import Base from "./entities/Base.mjs";

async function main() {
    // try {
    //     let base2 = new Base('Inseré');
    //     base2.id = await base2.insert_base(base2);
    //     console.log(base2);

    //     let base3 = await new Base().fetch_by_id(base2.id);
    //     console.log(base3);

    //     base3.name = 'Pasta';

    //     let base4 = await base3.update_base();

    //     console.log(base4);
    //     console.log(base3);


    // } catch (error) {
    //     console.log(error);
    // }
}
main();