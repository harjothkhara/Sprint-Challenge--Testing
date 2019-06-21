const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
    beforeEach(async () => {
        await db("posts").truncate();
    });
    describe('GET /games', async() => {
        it('should return status code 200 OK', () => {
            const response = await request(server).get('/api/games');
            expect(response.status).toBe(200)
        });
        it('should return json', async () => {
            const response = await request(server).get('/api/games');
            expect(response.type).toBe('application/json');
        });
        it('should return an array', async () => {
            const response = await request(server).get('/api/games');
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    })
});