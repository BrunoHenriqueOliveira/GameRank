import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Game} from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiUrl = '/api/recommend';

  constructor(private http: HttpClient) {}

  getRecommendations(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }
}
