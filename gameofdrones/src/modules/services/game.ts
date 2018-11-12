import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import { Match } from '../models/game';


@Injectable()
export class GameService {

  baseUrl = "http://localhost:3000"

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  GetMatchHistory(): Observable<List<Match>> {
    return this.http
      .get(this.baseUrl + "/game")
      .map(
        (response: any) => {
          return List(response);
        }
      )
  }

  SaveMatch(game : Match): Observable<any> {
    return this.http
      .post(this.baseUrl + "/game", game
      )
  }

  ngOnDestroy() {
  }


}
