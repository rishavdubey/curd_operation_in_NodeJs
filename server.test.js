const request = require('supertest');
const app = require('./server');


describe('Test the root path', () => {
  test('It should return a greeting message', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello World!');
    });
  });
});


describe('Test the items endpoint', () => {
  test('It should return a list of all items', () => {
    return request(app).get('/items').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });


  test('It should return a single item by ID', () => {
    return request(app).get('/items/:id').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('price');
    });
  });


  test('It should add a new item', () => {
    const item = {
      name: 'Test Item',
      description: 'A test item',
      price: 9.99
    };
    return request(app).post('/items').send(item).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'Test Item');
      expect(response.body).toHaveProperty('description', 'A test item');
      expect(response.body).toHaveProperty('price', 9.99);
    });
  });


  test('It should update an existing item', () => {
    const item = {
      name: 'Updated Test Item',
      description: 'An updated test item',
      price: 19.99
    };
    return request(app).put('/items/:id').send(item).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'Updated Test Item');
      expect(response.body).toHaveProperty('description', 'An updated test item');
      expect(response.body).toHaveProperty('price', 19.99);
    });
  });


  test('It should delete an existing item', () => {
    return request(app).delete('/items/:id').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Item deleted successfully');
    });
  });
});
