require("dotenv").config();
require('./config/database').connect();
const express = require('express');
const app=express();
const cors = require("cors");
app.use(cors());

const Item = require('./model/item');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('Hello World!');
});

app.get('/api/v1/items', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Item.find((err, items) => {
      if (err) return res.status(500).send(err);
      res.send(items);
  });
});

app.get('/api/v1/items/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Item.findById(req.params.id, (err, item) => {
      if (err) return res.status(500).send(err);
      if (!item) return res.status(404).send('Item not found');
      res.send(item);
    });
});

  // Create a new item
  app.post('/api/v1/items', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const item = new Item(req.body);
    item.save((err, item) => {
      if (err) return res.status(500).send(err);
      res.send(item);
    });
  });
  
  // Update an item by ID
  app.put('/api/v1/items/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, item) => {
      if (err) return res.status(500).send(err);
      if (!item) return res.status(404).send('Item not found');
      res.send(item);
    });
  });
  
  // Delete an item by ID
  app.delete('/api/v1/items/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Item.findByIdAndRemove(req.params.id, (err, item) => {
      if (err) return res.status(500).send(err);
      if (!item) return res.status(404).send('Item not found');
      res.send('Item deleted successfully');
    });
  });

 module.exports=app;