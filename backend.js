// import express from 'express';
// import swaggerUi from 'swagger-ui-express';
// import fs from 'fs';
// import path from 'path';
// import yaml from 'js-yaml';
// import morgan from 'morgan';
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const morgan = require('morgan');

//back-end imports
// import PokeBowl from "./entities/Poke.mjs";
// import Protein from "./entities/Protein.mjs";
// import Ingredient from "./entities/Ingredient.mjs";
// import Order from "./entities/Order.mjs";
// import Portion from "./entities/Portion.mjs";
// import OrderService from "./service/OrderService.mjs";
import Base from "./entities/Base.mjs";
// import PokeIngredients from "./contents/PokeIngredients.mjs";
// import PokeProteins from "./contents/PokeProteins.mjs";


const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'))

// Load existing Swagger YAML file
const swaggerFile = path.join(__dirname, 'openapi.yaml');
const swaggerDocument = yaml.load(fs.readFileSync(swaggerFile, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Define routes and web pages
app.get('/', (req, res) =>	res.send('Hello World!')) ;

app.get('/assets/bases', async (req, res)=> {
    list_base = new Base()
    console.log(await list_base.fetch_all())
})
// /assets/bases
// /assets/portions
// /assets/protein


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
