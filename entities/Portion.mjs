"use strict"

// constructor function of poke_bowl 
function Portion (name, price, max_protein, max_ingredient, increase_percentage_ingredients) {
    this.name = name;
    this.id = undefined;

    this.price = price;
    this.max_protein = max_protein;
    this.max_ingredient = max_ingredient;
    this.increase_percentage_ingredients = increase_percentage_ingredients;

    this.insert_portion = ()=> {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("INSERT INTO Portions (name, base_price, amount_proteins, amount_ingredients, increase_percentage_ingredients) VALUES (?, ?, ?, ?, ?)");
            stmt.run(this.name, this.price, this.max_protein, this.max_ingredient, this.increase_percentage_ingredients, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.lastID);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
    this.update_portion = async () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("UPDATE Portions SET (name, base_price, amount_proteins, amount_ingredients, increase_percentage_ingredients) = (?, ?, ?, ?, ?) WHERE id = ?");
            stmt.run(this.name, this.price, this.max_protein, this.max_ingredient, this.increase_percentage_ingredients, this.id, function (err) {
                if (err) {
                    if (this.id == undefined || this.name == undefined || this.price == undefined || this.max_protein == undefined || this.max_ingredient == undefined || this.increase_percentage_ingredients == undefined) {
                        reject("id or name or price or max_protein or max_ingredient or increase_percentage_ingredients is not defined");
                    }
                    else {
                        reject(err);
                    }
                }
                let portion_to_return = new Portion();
                portion_to_return.id = this.id;
                portion_to_return.name = this.name;
                portion_to_return.price = this.price;
                portion_to_return.max_protein = this.max_protein;
                portion_to_return.max_ingredient = this.max_ingredient;
                portion_to_return.increase_percentage_ingredients = this.increase_percentage_ingredients;
                resolve(portion_to_return);
            });
            stmt.finalize();
            db.db.close();
        });
    }
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
                    resolve(portion_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
}

export default Portion;