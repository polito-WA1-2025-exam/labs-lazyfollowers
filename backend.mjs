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
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(json());
app.use(morgan('dev'))

// Load existing Swagger YAML file
const swaggerFile = join('openapi.yaml');
const swaggerDocument = load(readFileSync(swaggerFile, 'utf8'));

app.use('/api-docs', serve, setup(swaggerDocument));


// Define routes and web pages
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/orders', async (req, res) => {
    res.json(await new Order().fetch_all_with_content());
}
);
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
    order.poke_ids = req.body.poke_ids;
    order.total_price = req.body.total_price;
    try {
        let order_id = await order.insert_order_and_content();
        console.log(order);
        res.status(201).json({ "id": order_id});
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

const port = 8000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
