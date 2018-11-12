export interface GameStore {
  currentStep: number;
  playerPlaying: number;
  round: number;
  player1Name: string;
  player2Name: string;
  scoreRound1: Round;
  scoreRound2: Round;
  scoreRound3: Round;
  playerWinner: string;
}

export interface Round {
  moveplayer1: string;
  moveplayer2: string;
  moveWinner: string;
  playerWinner: string;
}

export interface AppState {
  gameStore: GameStore;
}

export interface Match {
  player1Name: string;
  player2Name: string;
  scorePlayer1: number;
  scorePlayer2: number;
  playerWinner: string;
  date: Date;
}