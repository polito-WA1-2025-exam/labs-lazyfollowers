"use strict"
import DBconnection from "../migration/db.mjs";
import Ingredient from "../entities/Ingredient.mjs";
import Poke from "../entities/Poke.mjs";
// constructor function of PokeIngredients
function PokeIngredients() {
    this.id = undefined;

    // this.check_line_in_table = (poke_id, ingredient_id) => {
    //     return new Promise((resolve, reject) => {
    //         let db = new DBconnection();
    //         let stmt = db.db.prepare("SELECT * FROM PokeIngredients WHERE poke_id = ? AND ingredient_id = ?");
    //         stmt.get(poke_id, ingredient_id, function (err, row) {
    //             if (row == undefined || err) {
    //                 reject("ingredient or pokebowl not found");
    //             } else {
    //                 resolve("ingredient in pokebowl");
    //             }
    //         });
    //         stmt.finalize();
    //         db.db.close();
    //     });
    // }

    this.check_poke_in_table = (poke_id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtpoke = db.db.prepare("SELECT * FROM PokeIngredients WHERE poke_id = ?");
            stmtpoke.all(poke_id, function (err, rows) {
                if (rows.length == 0 || err ) {
                    reject("this pokebowl has no ingredient");
                } else {
                    resolve("pokebowl has ingredient");
                }
            });
            stmtpoke.finalize();
            db.db.close();
        });
    }

    this.fetch_by_poke_id = async (id) => {
        try {
            await this.check_poke_in_table(id)
        }
        catch (e){
            throw new Error(e);
        }
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtingredient = db.db.prepare("SELECT ingredient_id FROM PokeIngredients WHERE poke_id = ?");
            stmtingredient.all(id, function (err, rows) {
                if (rows.length == 0 || err ) {
                    reject("no ingredient found for this pokebowl");
                } else {
                    let result = []
                    for (let item of rows){
                        result.push(item.ingredient_id)
                    }
                    console.log("ingredients fetch done");

                    resolve(result);
                }
            });
            stmtingredient.finalize();
            db.db.close();
        });
    }
    this.insert_ingredient = async (poke_id, ingredient_id) => {
        // RETURN : id of the line inserted or error if poke or ingredient does not exist
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("INSERT INTO PokeIngredients (poke_id,ingredient_id) VALUES (?,?)");
            stmt.run(poke_id, ingredient_id, function (err) {
                if (err || this.lastID == undefined) {
                    reject(err);
                }
                else {
                    console.log("ingredient insert done");
                    resolve(this.lastID);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }

    this.delete_ingredient = async (id_to_delete) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("DELETE FROM PokeIngredients WHERE id = ?");
            stmt.run(id_to_delete, function (err) {
                if (err || this.lastID == 0) {
                    reject("ingredient not in pokebowl");
                }
                else {
                    console.log("ingredient delete done");
                    resolve(this.lastID);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
}

export default PokeIngredients;