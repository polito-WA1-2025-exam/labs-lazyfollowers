// import express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import fs from 'fs';
// import path from 'path';
// import yaml from 'js-yaml';
// import morgan from 'morgan';
import express, { json } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import morgan from 'morgan';
import { query, body, validationResult } from 'express-validator';

//back-end imports
import PokeBowl from "./entities/Poke.mjs";
import Protein from "./entities/Protein.mjs";
import Ingredient from "./entities/Ingredient.mjs";
import Order from "./entities/Order.mjs";
import Portion from "./entities/Portion.mjs";
import OrderService from "./service/OrderService.mjs";
import Base from "./entities/Base.mjs";
import PokeIngredients from "./contents/PokeIngredients.mjs";
import PokeProteins from "./contents/PokeProteins.mjs";


const app = express();
const port = 3000;

app.use(json());
app.use(morgan('dev'))

// Load existing Swagger YAML file
const swaggerFile = join('openapi.yaml');
const swaggerDocument = load(readFileSync(swaggerFile, 'utf8'));

app.use('/api-docs', serve, setup(swaggerDocument));


// Define routes and web pages
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/assets/bases', async (req, res) => {
    res.json(await new Base().fetch_all());
})
app.get('/assets/ingredients', async (req, res) => {
    res.json(await new Ingredient().fetch_all());
})
app.get('/assets/proteins', async (req, res) => {
    res.json(await new Protein().fetch_all());
})
app.get('/assets/portions', async (req, res) => {
    res.json(await new Portion().fetch_all());
})

app.post('/order', async (req, res) => {
    let order = new Order();
    try {
        order = await order.insert_order();
        res.status(201).json({ "id": order.id, "total_price": order.total_price });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
);
app.post('/poke', async (req, res) => {
    let poke = new PokeBowl();
    poke.base_id = req.body.base_id;
    poke.protein_ids = req.body.protein_ids;
    poke.ingredient_ids = req.body.ingredient_ids;
    poke.portion_id = req.body.portion_id;
    poke.price = req.body.price;
    try {
        let poke_id = await poke.insert_pokebowl_and_content();
        res.status(201).json({ "id": poke_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
);

app.put('/poke/:id', async (req, res) => {
    let poke = new PokeBowl();
    poke.base_id = req.body.base_id;
    poke.protein_ids = req.body.protein_ids;
    poke.ingredient_ids = req.body.ingredient_ids;
    poke.portion_id = req.body.portion_id;
    poke.price = req.body.price;
    try {
        await poke.modify_by_id(req.params.id);
        res.status(200).json("Poke bowl updated");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
);


app.listen(8000, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
