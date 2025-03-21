"use strict"
import DBconnection from "../migration/db.mjs";
// constructor function of ingredient 
function Ingredient(name) {
    this.id = undefined;
    this.name = name;
    this.insert_Ingredient = (name) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtingredient = db.db.prepare("INSERT INTO Ingredients (name) VALUES (?)");
            stmtingredient.run(name, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.lastID);
                }
            });
            stmtingredient.finalize();
            db.db.close();
        }
        );
    }
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtingredient = db.db.prepare("SELECT * FROM Bases WHERE id = ?");
            stmtingredient.get(id, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    let base_to_return = new Base();
                    base_to_return.id = row.id;
                    base_to_return.name = row.name;
                    resolve(base_to_return);
                }
            });
            stmtingredient.finalize();
            db.db.close();
        });
    }
    this.update_Ingredient = async () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtingredient = db.db.prepare("UPDATE Ingredients SET (name) = (?) WHERE id = ?");
            stmtingredient.run(this.name, this.id, function (err) {
                if (err) {
                    if (this.id == undefined || this.name == undefined) {
                        reject("id or name is not defined");
                    }
                    else {
                        reject(err);
                    }
                }
                let base_to_return = new Base();
                base_to_return.id = this.id;
                base_to_return.name = this.name;
                resolve(base_to_return);
            });
            stmtingredient.finalize();
            db.db.close();
        }
        );
    }
}



export default Ingredient;