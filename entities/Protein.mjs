"use strict"

// constructor function of protein 
function Protein(name) {
    this.name = name;
    this.id = undefined;

    this.insert_protein = () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("INSERT INTO Proteins (name) VALUES (?)");
            stmt.run(this.name, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("protein insert done");
                    resolve(this.lastID);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
    this.update_protein = async () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("UPDATE Proteins SET (name) = (?) WHERE id = ?");
            stmt.run(this.name, this.id, function (err) {
                if (err) {
                    if (this.id == undefined || this.name == undefined) {
                        reject("id or name is not defined");
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    let protein_to_return = new Protein();
                    protein_to_return.id = this.id;
                    protein_to_return.name = this.name;
                    console.log("protein update done");
                    resolve(protein_to_return);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
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