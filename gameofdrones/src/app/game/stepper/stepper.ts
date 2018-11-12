import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../modules/services/module';
import { List } from 'immutable';
import { Store } from '@ngrx/store';
import { AppState, GameStore, Round } from '../../../modules/models/game';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as gameActions from 'src/modules/actions/game';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class StepperComponent implements OnInit {

  private stateSubscription: any;
  private _move: string;
  game$: Observable<any>;
  game: GameStore;
  score: List<Round> = List();


  constructor(
    readonly service: GameService,
    private store: Store<AppState>
  ) {
    this.game$ = this.store.select('game');
  }

  namesForm = new FormGroup({
    player1Name: new FormControl('', Validators.required),
    player2Name: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.store.dispatch(new gameActions.Play(this.namesForm.value))
  }

  ngOnDestroy() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
      delete this.stateSubscription;
    }
  }

  ngOnInit() {
    this.stateSubscription = this.game$.subscribe((store: GameStore) => {
      this.game = store;
    });
  }

  set move(value: string) {
    this._move = value;
  }

  get move() {
    return this._move;
  }

  updateScore(game: GameStore): any {
    switch (game.round) {
      case 2:
        this.score = this.score.push(game.scoreRound1);
        break;

      case 3:
        this.score = this.score.push(game.scoreRound2);
        break;

      case 0:
        this.score = this.score.push(game.scoreRound3);
        this.store.dispatch(new gameActions.SetGlobalWinner({}));
        this.saveScore();
        break;

      default:
        break;
    }
  }

  saveScore() {
    this.service.SaveMatch({
      player1Name: this.game.player1Name,
      player2Name: this.game.player2Name,
      scorePlayer1: this.getScore(this.game, 1),
      scorePlayer2: this.getScore(this.game, 2),
      playerWinner: this.game.playerWinner,
      date: new Date(Date.now())
    }).subscribe();
  }

  getScore(game: GameStore, player: number): number {
    switch (player) {
      case 1:
        return this.countInArray([
          game.scoreRound1.playerWinner,
          game.scoreRound2.playerWinner,
          game.scoreRound3.playerWinner
        ], 'player1')


      case 2:
        return this.countInArray([
          game.scoreRound1.playerWinner,
          game.scoreRound2.playerWinner,
          game.scoreRound3.playerWinner
        ], 'player2')
    }
  }

  setMove(move: string, playerPlaying: number, round: number) {
    switch (playerPlaying) {
      case 1:
        this.store.dispatch(new gameActions.SetMovePlayer1(
          {
            move: move,
            playerPlaying: playerPlaying,
            round: round
          }
        ));
        this.move = undefined;
        break;

      case 2:
        this.store.dispatch(new gameActions.SetMovePlayer2(
          {
            move: move,
            playerPlaying: playerPlaying,
            round: round
          }
        ));
        this.store.dispatch(new gameActions.SetRoundWinner(
          {
            round: round
          }
        ));
        this.move = undefined;
        this.updateScore(this.game)
        break;

      default:
        break;
    }

  }

  countInArray = (array, what) => {
    return array.filter(item => item == what).length;
  }

  playAgain() {
    this.score = List();
    this.move = undefined;
    this.namesForm.reset(); 
    this.store.dispatch(new gameActions.PlayAgain({}));
  }

}