const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
    beforeEach(async () => {
        await db("games").truncate();
    });
    describe('GET /games', () => {
        it('should return status code 200 OK', async () => {
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
    });
    describe('GET /games/:id', () => {
        it('should return status code 200 ok', async () => {
            const response = await request(server).get('/api/games');
            expect(response.status).toBe(200);
        });
        it('should return json', async () => {
            const response = await request(server).get('/api/games');
            expect(response.type).toBe('application/json');
        });
        it('should return requested object', async () => {
            await request(server)
                .post('/api/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
            const response = await request(server).get('/api/games/1');
            expect(response.body.title).toBe('Pacman');
        });
        it('should return a status code 404 if object does not exist', async () => {
            const response = await request(server).get('/api/games/10');
            expect(response.status).toBe(404);
        });
    });
    describe("POST /games", () => {
        it('should return status code 201 if successful', async () => {
            const response = await request(server)
             .post('/api/games')
             .send({
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980
            });
            expect(response.status).toBe(201);
        })
        it('should return json if successful', async () => {
            const response = await request(server)
              .post('/api/games')
              .send({
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980
            });
            expect(response.type).toBe('application/json');
        });
        it('should return created object if successful', async () => {
            const response = await request(server)
              .post('/api/games')
              .send({
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980
            });
            expect(typeof response).toBe('object');
            expect(response.body.title).toBe('Pacman')
        });
        it('should fail with status code 422 if information is incomplete', async () => {
            const response = await request(server)
              .post('/api/games')
              .send({
                genre: 'Arcade',
                releaseYear: 1980
            });
            expect(response.status).toBe(422)
        });
        it('should fail with status code 405 if title is not unique', async () => {
            const response = await request(server)
                .post('/api/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
            const response2 = await request(server)
                .post('/api/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
             expect(response2.status).toBe(405);  
        });
    });
});