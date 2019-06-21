const db = require('./dbConfig.js');

module.exports = {
    find,
    findById,
    create,
    remove,
    update
};

async function find() {
    const games = await db('games');
    return games;
}

async function findById(id) {
    const games = await db("games")
        .where({ id })
        .first();
    return game;
}

async function create(item) {
    const [id] = await db("games").insert(item);
    if (id) {
        const game = await findById(id)
        return game;
    }
}

async function remove(id) {
    const game = await findById(id);
    if (game) {
        const deleted = await db("games")
            .where({ id })
            .del();
        if (deleted) {
            return game;
        }
    }
}

async function update(item, id) {
    const editedGame = await db("games")
        .where({ id })
        .update(item);
    if (editedGame) {
        const game = await findById(id);
        return game;
    }
}