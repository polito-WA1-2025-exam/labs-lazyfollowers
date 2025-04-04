"use strict"
import PokeBowl from "./Poke.mjs";
import DBconnection from "../migration/db.mjs";

// constructor function of order 
function Order() {
    this.id = undefined;
    this.total_price = undefined
    this.fetch_all_with_content = async () => {
        return new Promise(async (resolve, reject) => {
            let all_order = await this.fetch_all();
            let order_with_content = [];
            for (let item of all_order) {
                let order_id_cur = item.id;
                let total_price_cur = item.total_price;
                let poke_ids_cur = await new PokeBowl().fetch_by_order_id(order_id_cur)
                    .catch((err) => { throw new Error(err) });
                order_with_content.push({
                    order_id: order_id_cur,
                    total_price: total_price_cur,
                    poke_ids: poke_ids_cur
                });
            }
            resolve(order_with_content);

        });
    }

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