"use strict"
import DBconnection from "../migration/db.mjs";


// constructor function of poke_bowl 
function Portion(id, name, price, max_protein, max_ingredient, increase_percentage_ingredients) {
    this.name = name;
    this.id = id;

    this.price = price;
    this.max_protein = max_protein;
    this.max_ingredient = max_ingredient;
    this.increase_percentage_ingredients = increase_percentage_ingredients;

    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Portions WHERE id = ?");
            stmt.get(id, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    let portion_to_return = new Portion();
                    portion_to_return.id = row.id;
                    portion_to_return.name = row.name;
                    portion_to_return.price = row.base_price;
                    portion_to_return.max_protein = row.amount_proteins;
                    portion_to_return.max_ingredient = row.amount_ingredients;
                    portion_to_return.increase_percentage_ingredients = row.increase_percentage_ingredients;
                    console.log("portion fetch done");
                    resolve(portion_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
}

export default Portion;