const request = require('supertest');
const app = require('../server'); // Path to your Express app

describe('Product API Tests', () => {
  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products'); 
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch a product by ID', async () => {
    const res = await request(app).get('/api/products/67f3060e2730ec1e4a8c7e74');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name'); //product has a 'name' field
  });
});
