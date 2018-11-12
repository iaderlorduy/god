let GameModel = require('../models/game.model');
let express = require('express');
let HttpStatus = require('http-status-codes');
let router = express.Router();

//Create a new game
//POST localhost:3000/game
router.post('/game', (req, res) => {
  // req.body
  if (!req.body) {
    return res.status(HttpStatus.BAD_REQUEST).send('Request body is missing');
  }

  // let game = {
  //   "player1Name": "player 1",
  //   "player2Name": "player 2",
  //   "scorePlayer1": 2,
  //   "scorePlayer2": 0,
  //   "playerWinner": "player 1",
  //   "date": "2018/07/07" 
  // }

  let model = new GameModel(req.body);
  model.save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(doc);
      }
      res.status(HttpStatus.CREATED).send(doc);
    })
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
});

//get games
//GET localhost:3000/game
router.get('/game', (req, res) => {  
  GameModel.find({})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
});



module.exports = router;