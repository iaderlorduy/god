import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { GameService } from './game';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });
  });

  it(
    'should get matchs',
    inject(
      [HttpTestingController, GameService],
      (httpMock: HttpTestingController, dataService: GameService) => {
        const dummyMatchs = [
          {
            "player1Name": "player 1",
            "player2Name": "player 2",
            "scorePlayer1": 2,
            "scorePlayer2": 0,
            "playerWinner": "player 1",
            "date": "2018-07-07T05:00:00.000Z",
          },
          {
            "player1Name": "hader",
            "player2Name": "jose",
            "scorePlayer1": 1,
            "scorePlayer2": 1,
            "playerWinner": "draw",
            "date": "2018-11-11T17:09:46.883Z",
          },
          {
            "player1Name": "test 1",
            "player2Name": "test12",
            "scorePlayer1": 1,
            "scorePlayer2": 1,
            "playerWinner": "draw",
            "date": "2018-11-11T17:13:59.681Z",
          }
        ]
        dataService.GetMatchHistory().subscribe(matchs => {
          expect(matchs.size).toBeGreaterThanOrEqual(0);
        });

        const req = httpMock.expectOne(`${dataService.baseUrl}/game`);
        expect(req.request.method).toBe("GET");
        req.flush(dummyMatchs);
      }
    )
  );

  it(
    'should insert a match',
    inject(
      [HttpTestingController, GameService],
      (httpMock: HttpTestingController, dataService: GameService) => {
        const dummyMatch = {
          "player1Name": "player 1",
          "player2Name": "player 2",
          "scorePlayer1": 2,
          "scorePlayer2": 0,
          "playerWinner": "player 1",
          "date": new Date(Date.now()),
        }


        dataService.SaveMatch(dummyMatch).subscribe(match => {
          expect(match).toBeDefined();
        });

        const req = httpMock.expectOne(`${dataService.baseUrl}/game`);
        expect(req.request.method).toBe("POST");
        req.flush(dummyMatch);
      }
    )
  );

  it('can test for 404 error', () => {
    inject(
      [HttpTestingController, GameService],
      (httpMock: HttpTestingController, dataService: GameService) => {

        const emsg = 'deliberate 404 error';

        dataService.GetMatchHistory().subscribe(
          data => fail('should have failed with the 404 error'),
          (error: HttpErrorResponse) => {
            expect(error.status).toEqual(404, 'status');
            expect(error.error).toEqual(emsg, 'message');
          }
        );

        const req = httpMock.expectOne(`${dataService.baseUrl}/game`);

        // Respond with mock error
        req.flush(emsg, { status: 404, statusText: 'Not Found' });

      }
    )
  });
});