import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpcallService {
  private apiUrl = 'https://www.reddit.com/r/angular.json';

  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
