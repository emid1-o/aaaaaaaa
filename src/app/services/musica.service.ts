import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  private readonly API = 'http://localhost:8080/api/musicas/';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Musica[]> {
    return this.http.get<Musica[]>(this.API+"findAll");
  }

  save(musica: Musica): Observable<Musica> {
    return this.http.post<Musica>(this.API + 'save', musica);
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}deleteById/${id}`,  { responseType: 'text' as 'json' })
  }
}
