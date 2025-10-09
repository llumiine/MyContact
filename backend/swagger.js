const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'MyContact API', version: '1.0.0' },
    servers: [{ url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}` }],
  },
  apis: ['./controller/*.js', '../frontend/src/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };