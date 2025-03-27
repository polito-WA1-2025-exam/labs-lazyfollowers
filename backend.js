const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const app = express();
const port = 3000;

app.use(express.json());

// Load existing Swagger YAML file
const swaggerFile = path.join(__dirname, 'openapi.yaml');
const swaggerDocument = yaml.load(fs.readFileSync(swaggerFile, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
