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
        stmtbase.run(this.name);
        stmtbase.finalize();
        db.db.close();
    }
    this.update_database = (name) => {
        let db = new DBconnection();
        if (this.id == undefined) {
            throw new Error("id is not defined");
        }
        let stmtbase = db.db.prepare("UPDATE INTO Bases SET (name) VALUES (?) WHERE id = ?");
        stmtbase.run(this.name, this.id);
        stmtbase.finalize();
        db.db.close();
    }
}

export default Base;