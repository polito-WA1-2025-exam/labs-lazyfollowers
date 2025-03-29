"use strict"

import Portion from "./Portion.mjs";
import DBconnection from "../migration/db.mjs";
import Base from "./Base.mjs";
import Protein from "./Protein.mjs";
import Ingredient from "./Ingredient.mjs";
import PokeIngredients from "../contents/PokeIngredients.mjs";
import PokeProteins from "../contents/PokeProteins.mjs";

// constructor function of poke_bowl 
function PokeBowl() {
    /*create a pokebowl choosing a size
    add one ingredient
    remove on ingredient
    add one protein
    remove on protein
    choose/change base*/

    this.id = undefined;
    this.base_id = undefined; //id of base
    this.protein_ids = []; //array of id of protein
    this.ingredient_ids = []; //array of id of ingredient    
    this.price = undefined;
    this.portion_id = undefined; //id of portion

    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtingredient = db.db.prepare("SELECT * FROM Poke WHERE id = ?");
            stmtingredient.get(id, function (err, row) {
                if (err || row == undefined) {
                    reject("pokebowl not found");
                } else {
                    let pokebowl_to_return = new Ingredient();
                    pokebowl_to_return.id = row.id;
                    pokebowl_to_return.price = row.price;
                    pokebowl_to_return.base_id = row.base_id;
                    pokebowl_to_return.order_id = row.order_id;
                    pokebowl_to_return.portion_id = row.portion_id;
                    console.log("pokebowl fetch done");

                    resolve(pokebowl_to_return);
                }
            });
            stmtingredient.finalize();
            db.db.close();
        });
    }

    this.insert_pokebowl_and_content = async () => {

        if (this.price < 0) { // TODO: Calculate price with portion and ingredients ////////////////////////////////////
            throw new Error("price is negative");
        }
        await new Base().fetch_by_id(this.base_id)
            .catch((err) => { throw new Error(err) });
        await new Portion().fetch_by_id(this.portion_id)
            .catch((err) => { throw new Error(err) });

        for (let i = 0; i < this.protein_ids.length; i++) {
            await new Protein().fetch_by_id(this.protein_ids[i])
                .catch((err) => { throw new Error(err) });
        }
        for (let i = 0; i < this.ingredient_ids.length; i++) {
            await new Ingredient().fetch_by_id(this.ingredient_ids[i])
                .catch((err) => { throw new Error(err) });
        }

        this.id = await this.insert_pokebowl();

        for (let i = 0; i < this.protein_ids.length; i++) {
            await new PokeProteins().insert_protein(this.id, this.protein_ids[i]).catch((err) => { console.log(err) });
        }
        for (let i = 0; i < this.ingredient_ids.length; i++) {
            await new PokeIngredients().insert_ingredient(this.id, this.ingredient_ids[i]).catch((err) => { console.log(err) });
        }
        return this.id;
    }
    this.insert_pokebowl = async () => {
        return new Promise((resolve, reject) => {

            let db = new DBconnection();

            let stmt = db.db.prepare("INSERT INTO Poke (base_id, price ,portion_id) VALUES (?, ?, ?)");
            stmt.run(this.base_id, this.price, this.portion_id, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("pokebowl insert done");
                    resolve(this.lastID);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
    // this.update_pokebowl = async () => {
    //     return new Promise((resolve, reject) => {
    //         let db = new DBconnection();
    //         let stmt = db.db.prepare("UPDATE Pokebowl SET (base_id, price) = (?, ?) WHERE id = ?");
    //         stmt.run(this.base.id, this.price, this.id, function (err) {
    //             if (err) {
    //                 if (this.id == undefined || this.base == undefined || this.price == undefined) {
    //                     reject("id or base or price is not defined");
    //                 }
    //                 else {
    //                     reject(err);
    //                 }
    //             }
    //             else {
    //                 let pokebowl_to_return = new PokeBowl();
    //                 pokebowl_to_return.id = this.id;
    //                 pokebowl_to_return.base = this.base;
    //                 pokebowl_to_return.price = this.price;
    //                 console.log("pokebowl update done");
    //                 resolve(pokebowl_to_return);
    //             }
    //         });
    //         stmt.finalize();
    //         db.db.close();
    //     });
    // }
    // this.fetch_by_id = (id) => {
    //     return new Promise((resolve, reject) => {
    //         let db = new DBconnection();
    //         let stmtpoke = db.db.prepare("SELECT * FROM Poke WHERE id = ?");
    //         stmtpoke.get(id, function (err, row) {
    //             if (err || row == undefined) {
    //                 reject("poke not found");
    //             } else {
    //                 let pokebowl_to_return = new PokeBowl();
    //                 pokebowl_to_return.id = row.id;
    //                 pokebowl_to_return.base = row.base;
    //                 pokebowl_to_return.price = row.price;
    //                 console.log("pokebowl fetch done");

    //                 resolve(pokebowl_to_return);
    //             }
    //         });
    //         stmtpoke.finalize();
    //         db.db.close();
    //     });
    // }


}

export default PokeBowl;