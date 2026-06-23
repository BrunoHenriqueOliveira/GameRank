import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, Review } from '../../models/game';

@Injectable({ providedIn: 'root' })
export class GameService {
  private api = 'http://localhost:8080/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.api);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.api}/${id}`);
  }

  getReviews(gameId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api}/${gameId}/reviews`);
  }
}
