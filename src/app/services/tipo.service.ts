import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private tipoUrl = 'http://localhost:8080/api/tipo';

  constructor(private http: HttpClient) {}

  
  getTipo(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.tipoUrl);
  }

  getTipoById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.tipoUrl}/${id}`); 
  }

  createTipo(tipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(this.tipoUrl, tipo);
  }

  
  updateTipo(tipo: Tipo): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.tipoUrl}/${tipo.id}`, tipo); 
  }

  deleteTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tipoUrl}/${id}`); 
  }
}