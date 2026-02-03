const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Task API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:5000/api/v1' }],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);
module.exports = specs;