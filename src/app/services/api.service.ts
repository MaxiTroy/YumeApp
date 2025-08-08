import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HomeCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export interface ImportantInfo {
  id: number;
  title: string;
  description: string;
  icon: string;
  highlight: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getServices(): Observable<HomeCard[]> {
    return this.http.get<HomeCard[]>(`${this.baseUrl}/services`);
  }

  getImportantInfo(): Observable<ImportantInfo[]> {
    return this.http.get<ImportantInfo[]>(`${this.baseUrl}/importantInfo`);
  }
}
