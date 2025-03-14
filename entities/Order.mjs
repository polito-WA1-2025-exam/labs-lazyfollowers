"use strict"

// constructor function of order 
function Order () {
    this.list_of_poke_bowl = [];
    this.id = undefined;

    this.add_Poke = (Pokebowl) => this.list_of_poke_bowl.push(Pokebowl);
    this.remove_Poke = (criteria, value) => this.list_of_poke_bowl.filter(Pokebowl => Pokebowl.criteria != value);
    this.total_price = () => console.log("TO DO : calculate price");
}


export default Order;