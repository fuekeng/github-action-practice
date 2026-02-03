const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('API is running');
    });
  });

  describe('Users API', () => {
    describe('GET /api/v1/users', () => {
      it('should return list of users', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('GET /api/v1/users/:id', () => {
      it('should return a user by id', async () => {
        const response = await request(app).get('/api/v1/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('id');
      });

      it('should return 404 for non-existent user', async () => {
        const response = await request(app).get('/api/v1/users/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe('error');
      });
    });

    describe('POST /api/v1/users', () => {
      it('should create a new user', async () => {
        const userData = {
          name: 'Test User',
          email: 'test@example.com'
        };
        const response = await request(app)
          .post('/api/v1/users')
          .send(userData);
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.data.name).toBe(userData.name);
      });

      it('should return 400 for invalid data', async () => {
        const response = await request(app)
          .post('/api/v1/users')
          .send({ name: 'Test' });
        expect(response.statusCode).toBe(400);
      });
    });

    describe('PUT /api/v1/users/:id', () => {
      it('should update a user', async () => {
        const updateData = {
          name: 'Updated Name'
        };
        const response = await request(app)
          .put('/api/v1/users/1')
          .send(updateData);
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
      });
    });

    describe('DELETE /api/v1/users/:id', () => {
      it('should delete a user', async () => {
        const response = await request(app).delete('/api/v1/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
      });
    });
  });

  describe('Products API', () => {
    describe('GET /api/v1/products', () => {
      it('should return list of products', async () => {
        const response = await request(app).get('/api/v1/products');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
        expect(Array.isArray(response.body.data)).toBe(true);
      });
    });

    describe('GET /api/v1/products/:id', () => {
      it('should return a product by id', async () => {
        const response = await request(app).get('/api/v1/products/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
      });

      it('should return 404 for non-existent product', async () => {
        const response = await request(app).get('/api/v1/products/999');
        expect(response.statusCode).toBe(404);
      });
    });

    describe('POST /api/v1/products', () => {
      it('should create a new product', async () => {
        const productData = {
          name: 'Test Product',
          price: 99.99,
          description: 'Test Description'
        };
        const response = await request(app)
          .post('/api/v1/products')
          .send(productData);
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe('success');
      });
    });
  });

  describe('404 Error Handling', () => {
    it('should return 404 for non-existent route', async () => {
      const response = await request(app).get('/api/v1/nonexistent');
      expect(response.statusCode).toBe(404);
      expect(response.body.status).toBe('error');
    });
  });
});
