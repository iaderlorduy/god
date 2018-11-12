import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../modules/services/module';
import { List } from 'immutable';
import { Store } from '@ngrx/store';
import { AppState, Match } from '../../../modules/models/game';

@Component({
  templateUrl: './template.html',
  styleUrls: ['styles.scss']
})
export class HistoryComponent implements OnInit {

  private MatchSubscription: any;
  Matchs: List<any> = List();


  constructor(
    readonly service: GameService,
    private store: Store<AppState>
  ) {
  } 

  ngOnDestroy() {
    if (this.MatchSubscription) {
      this.MatchSubscription.unsubscribe();
      delete this.MatchSubscription;
    }
  }

  ngOnInit() {
    this.MatchSubscription = this.service.GetMatchHistory().subscribe(
      (matchs : List<Match>)=>{
        this.Matchs = matchs;
        console.log(matchs);
      }
    )
  }
}