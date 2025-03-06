// tarea.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://localhost:8080/api/tareas'; 

  constructor(private http: HttpClient) { }

  // Obtener todas las tareas
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Agregar una nueva tarea
  agregarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  // Actualizar el estado de una tarea
  actualizarEstado(id: string, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`,  tarea );
  }

  // Eliminar una tarea
  eliminarTarea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
