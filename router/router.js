const router = require('express').Router();

const db = require('../data/games-model.js');

router.get('/', async (req, res) => {
   try {
       const games = await db.find();
       if (games) {
           res.status(200).json(games);
       }
   } catch (error) {
       res.status(500).json({ message: `Games could not be found ${error}.` });
   }
});

router.post('/', async (req, res) => {
    const game = req.body;
    if (!game.title || !game.genre) {
        res.status(422).json({ message: "Please enter a valid title and genre" });
    } else {
        try {
            const newGame = await db.create(game);
            if (newGame) {
                res.status(201).json(newGame);
            }
        } catch (error) {
            res.status(405).json({
                message: `Your game could not be used because the title is not unique ${error}.`
            });
        }
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const game = await db.findById(id);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ message: "Game with specified ID does not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: `Game request failed ${error}` });
    }
});

module.exports = router;