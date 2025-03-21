"use strict"

import Portion from "./Portion.mjs";
import DBconnection from "../migration/db.mjs";

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


    this.insert_pokebowl = () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("INSERT INTO Poke (base_id, price ,portion_id) VALUES (?, ?, ?)");
            if (this.base == undefined || this.price == undefined || this.portion == undefined) {
                reject("base or price or portion is not defined");
            }
            if (this.base.id == undefined || this.portion.id == undefined) {
                reject("base id or portion id is not defined");
            }
            this.base.fetch_by_id(this.base_id)
            .catch((err) => {reject("base not found"+err)});

            this.portion.fetch_by_id(this.portion_id)
            .catch((err) => {reject("base not found"+err)});

            this.protein.fetch_by_ids(this.protein_ids)
            .catch((err) => {reject("protein not found"+err)});


            this.ingredient.fetch_by_ids(this.ingredient_ids)
            .catch((err) => {reject("protein not found"+err)});


            if (this.price < 0) {
                reject("price is negative");
            }

            stmt.run(this.base.id, this.price, this.portion.id, function (err) {
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
    this.update_pokebowl = async () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("UPDATE Pokebowl SET (base_id, price) = (?, ?) WHERE id = ?");
            stmt.run(this.base.id, this.price, this.id, function (err) {
                if (err) {
                    if (this.id == undefined || this.base == undefined || this.price == undefined) {
                        reject("id or base or price is not defined");
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    let pokebowl_to_return = new PokeBowl();
                    pokebowl_to_return.id = this.id;
                    pokebowl_to_return.base = this.base;
                    pokebowl_to_return.price = this.price;
                    console.log("pokebowl update done");
                    resolve(pokebowl_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Pokebowl WHERE id = ?");
            stmt.get(id, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    let pokebowl_to_return = new PokeBowl();
                    pokebowl_to_return.id = row.id;
                    pokebowl_to_return.base = row.base;
                    pokebowl_to_return.price = row.price;
                    console.log("pokebowl fetch done");
                    resolve(pokebowl_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }


}

export default PokeBowl;