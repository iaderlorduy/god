let mongoose = require('mongoose');
const server = 'ds231242.mlab.com:31242';
const database = 'god';
const user = 'root';
const password = 'abc123';

mongoose.connect(
  `mongodb://${user}:${password}@${server}/${database}`,
  {
    useNewUrlParser: true
  },
  (err) => {
    if (err) console.log("test")
  }
);

let GameSchema = new mongoose.Schema({
  player1Name: String,
  player2Name: String,
  scorePlayer1: Number,
  scorePlayer2: Number,
  playerWinner: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);