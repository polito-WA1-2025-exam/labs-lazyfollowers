"use strict"
import DBconnection from "../migration/db.mjs";
// constructor function of ingredient 
function Base(name) {
    this.id = undefined;
    this.name = name;
    // TODO: fetch by id, retrieve Id after insertion (maybe use let insertedId = this.lastID after run)

    this.insert_into_database = () => {
        let db = new DBconnection();
        let stmtbase = db.db.prepare("INSERT INTO Bases (name) VALUES (?)");
        stmtbase.run(this.name, function (err) {
            if (err) {
                throw err;
            }
            this.id = this.lastID;
        });
        stmtbase.finalize();
        db.db.close();
    }
    this.update_database = async () => {
        let db = new DBconnection();
        if (this.id == undefined || this.name == undefined) {
            throw new Error("id is not defined");
        }
        let stmtbase = db.db.prepare("UPDATE INTO Bases SET (name) VALUES (?) WHERE id = ?");
        stmtbase.run([this.name, this.id], function (err) {
            if (err) {
                throw err;
            }
        });
        stmtbase.finalize();
        db.db.close();
    }
    this.fetch_by_id = (id) => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtbase = db.db.prepare("SELECT * FROM Bases WHERE id = ?");
            stmtbase.get(id, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    let base_to_return = new Base();
                    base_to_return.id = row.id;
                    base_to_return.name = row.name;
                    resolve(base_to_return);
                }
            });
            stmtbase.finalize();
            db.db.close();
        });
    }
}

export default Base;