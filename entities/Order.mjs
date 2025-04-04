"use strict"
import PokeBowl from "./Poke.mjs";
import DBconnection from "../migration/db.mjs";

// constructor function of order 
function Order() {
    this.id = undefined;
    this.total_price = undefined
    this.fetch_all = () => {
        return new Promise((resolve, reject) => {
            let db = new DBconnection();
            let stmt = db.db.prepare("SELECT * FROM Orders");
            stmt.all(function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    let list_order = [];
                    for (let item of rows) {
                        let order = new Order();
                        order.id = item.id;
                        order.total_price = item.total_price;
                        list_order.push(order)
                    }
                    console.log("orders fetches done");
                    console.log(list_order);
                    resolve(list_order);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }
    this.insert_order_and_content = async () => {
        if (this.total_price <= 0) { // TODO: Calculate price with portion and ingredients ////////////////////////////////////
            throw new Error("price is negative");
        }
        for (let i = 0; i < this.poke_ids.length; i++) {
            await new PokeBowl().fetch_by_id(this.poke_ids[i])
                .catch((err) => { throw new Error(err) });
        }
        this.id = await this.insert_order();

        for (let i = 0; i < this.poke_ids.length; i++) {
            let poke_with_order = new PokeBowl();
            poke_with_order.order_id = this.id;
            await poke_with_order.update_order_id(this.poke_ids[i])
                .catch((err) => { throw new Error(err) });
        }
        return this.id;
    }
    this.insert_order = async () => {
        return new Promise((resolve, reject) => {

            let db = new DBconnection();

            let stmt = db.db.prepare("INSERT INTO Orders (total_price) VALUES (?)");
            stmt.run(this.total_price, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("order insert done");
                    resolve(this.lastID);
                }
            });
            stmt.finalize();
            db.db.close();
        });
    }


    // DON'T USE, WORK IN PROGRESS
    // this.add_Poke = (Pokebowl) => this.list_of_poke_bowl.push(Pokebowl);
    // this.remove_Poke = (criteria, value) => this.list_of_poke_bowl.filter(Pokebowl => Pokebowl.criteria != value);
    // this.total_price = () => console.log("TO DO : calculate price");
}


export default Order;