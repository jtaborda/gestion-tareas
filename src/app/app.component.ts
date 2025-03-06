// app.component.ts
import { Component, OnInit } from '@angular/core';
import { TareaService } from './tarea.service';

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tareas: Tarea[] = [];
  nuevaDescripcion: string = ''; 
  nuevoTitulo: string = '';
  mensajeExito ="";

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  // Cargar tareas desde el backend
  cargarTareas(): void {
    this.tareaService.getTareas().subscribe((tareas) => {
      this.tareas = tareas;
    });
  }

  // Agregar una nueva tarea
  agregarTarea(): void {
    if (this.nuevoTitulo && this.nuevaDescripcion) {
      const tarea: Tarea = {
        id: '',  // El backend asignará un id
        titulo: this.nuevoTitulo,
        descripcion: this.nuevaDescripcion,
        estado: 'pendiente',
      };

      this.tareaService.agregarTarea(tarea).subscribe(() => {
        this.cargarTareas();  // Recargar las tareas después de agregar una nueva
        this.nuevoTitulo = '';
        this.nuevaDescripcion = '';
      });

      this.mensajeExito = '¡Tarea agregada con éxito!';
      setTimeout(() => {
        this.mensajeExito = '';
      }, 3000);
    }
  }

  // Eliminar una tarea
  eliminarTarea(id: string): void {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);  // Eliminar tarea de la lista
  }
}
