"use strict"
import DBconnection from "../migration/db.mjs";
// constructor function of ingredient 
function Ingredient(name) {
    this.id = undefined;
    this.name = name;
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtingredient = db.db.prepare("SELECT * FROM Ingredients WHERE id = ?");
            stmtingredient.get(id, function (err, row) {
                if (err || row == undefined) {
                    reject("ingredient not found");
                } else {
                    let ingredient_to_return = new Ingredient();
                    ingredient_to_return.id = row.id;
                    ingredient_to_return.name = row.name;
                    console.log("ingredient fetch done");

                    resolve(ingredient_to_return);
                }
            });
            stmtingredient.finalize();
            db.db.close();
        });
    }
}



export default Ingredient;