// tarea.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TareaService } from '../tarea.service';

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent {
  @Input() tarea!: Tarea;  
    // Recibimos la tarea a través de Input
  @Output() tareaEliminada = new EventEmitter<string>(); // Emitimos el id de la tarea cuando se elimine

  constructor(private tareaService: TareaService) { }

  // Actualizar el estado de la tarea
  actualizarEstado(nuevoEstado: string,tareas: Tarea): void {
    const tarea: Tarea = {
      estado: nuevoEstado,
      id: '',
      titulo: tareas.titulo ,
      descripcion: tareas.descripcion 
    };
    this.tareaService.actualizarEstado(this.tarea.id, tarea).subscribe(() => {
      this.tarea.estado = nuevoEstado;
    });
  }

  // Eliminar tarea
  eliminarTarea(): void {
    this.tareaService.eliminarTarea(this.tarea.id).subscribe(() => {
      this.tareaEliminada.emit(this.tarea.id);  // Emitimos el id para que el componente padre lo maneje
    });
  }
}
