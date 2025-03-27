"use strict"
import DBconnection from "../migration/db.mjs";

// constructor function of protein 
function Protein(name) {
    this.name = name;
    this.id = undefined;
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Proteins WHERE id = ?");
            stmt.get(id, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    let protein_to_return = new Protein();
                    protein_to_return.id = row.id;
                    protein_to_return.name = row.name;
                    console.log("protein fetch done");
                    resolve(protein_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
}


export default Protein;