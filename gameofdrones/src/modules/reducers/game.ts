import { GameStore, Round } from '../models/game';
import { AllGameActions, gameActions } from '../actions/game';

export type Action = AllGameActions

const defaultState: GameStore = {
  currentStep: 1,
  playerPlaying: 1,
  round: 0,
  player1Name: '',
  player2Name: '',
  scoreRound1: {
    moveplayer1: '',
    moveplayer2: '',
    moveWinner: '',
    playerWinner: ''
  },
  scoreRound2: {
    moveplayer1: '',
    moveplayer2: '',
    moveWinner: '',
    playerWinner: ''
  },
  scoreRound3: {
    moveplayer1: '',
    moveplayer2: '',
    moveWinner: '',
    playerWinner: ''
  },
  playerWinner: ''
}

const countInArray = (array, what) => {
  return array.filter(item => item == what).length;
}

const newObject = (obj, newData) => {
  return Object.assign({}, obj, newData);
}

const moveWinner = (round: Round) => {
  if ((round.moveplayer1 === 'rock' && round.moveplayer2 === 'scissors') || (round.moveplayer1 === 'scissors' && round.moveplayer2 === 'rock')) return 'rock';
  if ((round.moveplayer1 === 'rock' && round.moveplayer2 === 'paper') || (round.moveplayer1 === 'paper' && round.moveplayer2 === 'rock')) return 'paper';
  if ((round.moveplayer1 === 'paper' && round.moveplayer2 === 'scissors') || (round.moveplayer1 === 'scissors' && round.moveplayer2 === 'paper')) return 'scissors';
  if (round.moveplayer1 === round.moveplayer2) return 'draw';
  return 'invalid';
}

const globalPlayerWinner = (winners: Array<string>, player1: string, player2: string) => {
  let count1 = countInArray(winners, 'player1');
  let count2 = countInArray(winners, 'player2');
  if ((count1 == 0 && count2 == 0) || (count1 == count2)) return 'draw';
  if (count1 > count2) return player1;
  return player2;
}

const playerWinner = (round: Round) => {
  let _moveWinner = moveWinner(round)
  if (_moveWinner === "draw") return '';
  let isPlayer1Winner = round.moveplayer1 === _moveWinner;
  let isPlayer2Winner = round.moveplayer2 === _moveWinner;
  if (isPlayer1Winner && !isPlayer2Winner) return 'player1';
  if (!isPlayer1Winner && isPlayer2Winner) return 'player2';
}

export function gameReducer(state: GameStore = defaultState, action: Action | any) {
  switch (action.type) {
    case gameActions.PLAY:
      return newObject(state, {
        currentStep: 2,
        round: 1,
        player1Name: action.changes.player1Name,
        player2Name: action.changes.player2Name,
      });

    case gameActions.SETMOVEPLAYER1:
      if (action.changes.round == 1) {
        return newObject(state, {
          playerPlaying: 2,
          scoreRound1: newObject(state.scoreRound1, {
            moveplayer1: action.changes.move,
          })
        });
      }
      if (action.changes.round == 2) {
        return newObject(state, {
          playerPlaying: 2,
          scoreRound2: newObject(state.scoreRound2, {
            moveplayer1: action.changes.move,
          })
        });
      }
      if (action.changes.round == 3) {
        return newObject(state, {
          playerPlaying: 2,
          scoreRound3: newObject(state.scoreRound3, {
            moveplayer1: action.changes.move,
          })
        });
      }

    case gameActions.SETMOVEPLAYER2:
      if (action.changes.round == 1) {
        return newObject(state, {
          scoreRound1: newObject(state.scoreRound1, {
            moveplayer2: action.changes.move,
          })
        });
      }
      if (action.changes.round == 2) {
        return newObject(state, {
          scoreRound2: newObject(state.scoreRound2, {
            moveplayer2: action.changes.move,
          })
        });
      }
      if (action.changes.round == 3) {
        return newObject(state, {
          scoreRound3: newObject(state.scoreRound3, {
            moveplayer2: action.changes.move,
          })
        });
      }

    case gameActions.SETROUNDWINNER:
      if (action.changes.round == 1) {
        return newObject(state, {
          playerPlaying: 1,
          round: 2,
          scoreRound1: newObject(state.scoreRound1, {
            moveWinner: moveWinner(state.scoreRound1),
            playerWinner: playerWinner(state.scoreRound1)
          })
        });
      }
      if (action.changes.round == 2) {
        return newObject(state, {
          playerPlaying: 1,
          round: 3,
          scoreRound2: newObject(state.scoreRound2, {
            moveWinner: moveWinner(state.scoreRound2),
            playerWinner: playerWinner(state.scoreRound2)
          })
        });
      }
      if (action.changes.round == 3) {
        return newObject(state, {
          playerPlaying: 1,
          round: 0,
          currentStep: 3,
          scoreRound3: newObject(state.scoreRound3, {
            moveWinner: moveWinner(state.scoreRound3),
            playerWinner: playerWinner(state.scoreRound3)
          })
        });
      }

    case gameActions.SETGLOBALWINNER:
      return newObject(state, {
        playerWinner: globalPlayerWinner([
          state.scoreRound1.playerWinner,
          state.scoreRound2.playerWinner,
          state.scoreRound3.playerWinner
        ], state.player1Name, state.player2Name)
      });

    case gameActions.PLAYAGAIN:
      return newObject(state, defaultState);

    default:
      return state;
  }

}