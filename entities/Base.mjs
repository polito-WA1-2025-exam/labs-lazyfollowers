"use strict"
import DBconnection from "../migration/db.mjs";
// constructor function of ingredient 
function Base(name) {
    this.id = undefined;
    this.name = name;
    this.create_Base = (name) => {
        let db = new DBconnection();
        let stmtbase =  db.db.prepare("INSERT INTO base (name) VALUES (?)");
        stmtbase.run(name);
        stmtbase.finalize();
        db.db.close();
    }
}


export default Base;