"use strict"
import DBconnection from "../migration/db.mjs";
// constructor function of ingredient 
function Base(name) {
    this.id = undefined;
    this.name = name;

    this.insert_base = () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtbase = db.db.prepare("INSERT INTO Bases (name) VALUES (?)");
            stmtbase.run(this.name, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("base insertion done");
                    resolve(this.lastID);
                }
            });
            stmtbase.finalize();
            db.db.close();
        }
        );
    }
    this.update_base = async () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmtbase = db.db.prepare("UPDATE Bases SET (name) = (?) WHERE id = ?");
            stmtbase.run(this.name, this.id, function (err) {
                if (err) {
                    if (this.id == undefined || this.name == undefined) {
                        reject("id or name is not defined");
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    let base_to_return = new Base();
                    base_to_return.id = this.id;
                    base_to_return.name = this.name;
                    console.log("base update done");
                    resolve(base_to_return);
                }
            });
            stmtbase.finalize();
            db.db.close();
        }
        );

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
                    console.log("base fetch done");
                    resolve(base_to_return);
                }
            });
            stmtbase.finalize();
            db.db.close();
        });
    }
}

export default Base;