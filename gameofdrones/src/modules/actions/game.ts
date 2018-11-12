import { Action } from '@ngrx/store';

export const gameActions = {
  PLAY: "PLAY",
  SETMOVEPLAYER1: "SETMOVEPLAYER1",
  SETMOVEPLAYER2: "SETMOVEPLAYER2",
  SETROUNDWINNER: "SETROUNDWINNER",
  SETGLOBALWINNER: "SETGLOBALWINNER",
  PLAYAGAIN: "PLAYAGAIN"
}

export class Play implements Action {
  readonly type = gameActions.PLAY;
  constructor(public changes: {}) { }
}

export class SetMovePlayer1 implements Action {
  readonly type = gameActions.SETMOVEPLAYER1;
  constructor(public changes: {}) { }
}

export class SetMovePlayer2 implements Action {
  readonly type = gameActions.SETMOVEPLAYER2;
  constructor(public changes: {}) { }
}

export class SetRoundWinner implements Action {
  readonly type = gameActions.SETROUNDWINNER;
  constructor(public changes: {}) { }
}

export class SetGlobalWinner implements Action {
  readonly type = gameActions.SETGLOBALWINNER;
  constructor(public changes: {}) { }
}

export class PlayAgain implements Action {
  readonly type = gameActions.PLAYAGAIN;
  constructor(public changes: {}) { }
}

export type AllGameActions = Play | SetMovePlayer1 | SetMovePlayer2 | SetRoundWinner | SetGlobalWinner | PlayAgain;