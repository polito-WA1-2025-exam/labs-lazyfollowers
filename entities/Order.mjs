"use strict"
import PokeBowl from "./Poke.mjs";

// constructor function of order 
function Order() {
    this.poke_ids = [];
    this.id = undefined;
    this.total_price = undefined

    this.insert_order = async () => {
        if (this.total_price < 0) { // TODO: Calculate price with portion and ingredients ////////////////////////////////////
            throw new Error("price is negative");
        }
        for (let i = 0; i < this.poke_ids.length; i++) {
            await new PokeBowl().fetch_by_id(this.poke_ids[i])
                .catch((err) => { throw new Error(err) });
        }
        this.id = await this.insert_order();

        for (let i = 0; i < this.poke_ids.length; i++) {
            //TODO: INSERT ID OF ORDER IN each Poke
        }
        let order_to_return = new Order;
        order_to_return.id = this.lastID;
        order_to_return.total_price = this.total_price
        resolve(order_to_return);
    }
    this.insert_order = async () => {
        return new Promise((resolve, reject) => {

            let db = new DBconnection();

            let stmt = db.db.prepare("INSERT INTO Order (total_price) VALUES (?)");
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