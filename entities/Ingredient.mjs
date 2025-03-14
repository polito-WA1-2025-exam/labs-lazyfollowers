"use strict"
import DBconnection from "../migration/db.mjs";
// constructor function of ingredient 
function Ingredient(name) {
    this.id = undefined;
    this.name = name;
    this.create_Ingredient = (name) => {
        let db = new DBconnection();
        let stmtingredient =  db.db.prepare("INSERT INTO ingredient (name) VALUES (?)");
        stmtingredient.run(name);
        stmtingredient.finalize();
        db.db.close();
    }
}



export default Ingredient;