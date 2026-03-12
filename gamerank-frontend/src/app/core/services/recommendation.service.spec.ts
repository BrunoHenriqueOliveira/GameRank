import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private apiUrl = '/api/games/recommendations';

  constructor(private http: HttpClient) {}

  getRecommendations(preferences: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, preferences);
  }
}
