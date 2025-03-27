const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(express.json());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js API with Swagger',
    version: '1.0.0',
    description: 'A simple API documented with Swagger',
  },
  servers: [{ url: `http://localhost:${port}` }],
  paths: {} // We will populate this dynamically
};

const swaggerDocs = swaggerJsdoc({ definition: swaggerDefinition, apis: [] });

// Define a function to register routes with Swagger
const registerRoute = (method, path, handler, description, responses) => {
  app[method](path, handler);

  swaggerDefinition.paths[path] = {
    [method]: {
      summary: description,
      responses: responses || {
        200: { description: 'Success' }
      }
    }
  };
};

// Define routes dynamically
registerRoute('get', '/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
}, 'Returns a welcome message', {
  200: {
    description: 'Success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Welcome to the API' }
          }
        }
      }
    }
  }
});

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
