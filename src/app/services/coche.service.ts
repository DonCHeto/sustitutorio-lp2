import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coche } from '../models/coche';
import { Marca } from '../models/marca';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private apiUrl = 'http://localhost:8080/api/escuela';
  private facultadUrl = 'http://localhost:8080/api/facultad';

  constructor(private http: HttpClient) {}

  // Cargar todas las escuelas
  getCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(this.apiUrl);
  }

  // Cargar todas las facultades
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

    // Cargar todas las facultades
    getTipos(): Observable<Tipo[]> {
      return this.http.get<Tipo[]>(this.apiUrl);
    }

  // Crear una nueva escuela
  createCoche(coche: Coche): Observable<Coche> {
    // Crear el payload solo con el id de la facultad
    const payload = {
      placa: coche.placa,
      puertas : coche.puertas,
      marca: {id: coche.marca.id}
      tipo: {id: coche.tipo.id}
    };
    return this.http.post<Coche>(this.apiUrl, payload);
  }

  // Actualizar una escuela existente
  updateCoche(coche: Coche): Observable<Coche> {
    // Crear el payload solo con el id de la facultad
    const payload = {
      id: coche.id,
      placa: coche.placa,
      puertas : coche.puertas,
      marca: { id: coche.marca.id }
    };
    return this.http.put<Coche>(`${this.apiUrl}/${coche.id}`, payload);
  }

  // Eliminar una escuela
  deleteCoche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
