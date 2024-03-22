import { Component, EventEmitter, Output } from '@angular/core';
import { FormTrainingComponent } from '../form-training/form-training.component';
import { FormSimulationComponent } from '../form-simulation/form-simulation.component';
import { EntrenamientoService } from '../../service/training.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormTrainingComponent, FormSimulationComponent],
  templateUrl: "sidebar.component.html",
  styleUrl: "sidebar.component.css"
})
export class SidebarComponent {
  seleccionado = "Entrenamiento";
  entrenado!: boolean;
  activacion: any;
  @Output() seleccionadoChange = new EventEmitter<string>();
  @Output() seleccionadoSide = new EventEmitter<string>();

  cambiarDatos(param: any) {
    this.seleccionadoChange.emit(param);
    this.activacion = param.activacion
  }
  cambiarSele(){
    this.seleccionadoSide.emit('Simulacion');
  }

  handleClick() {
    this.entrenado = this.entrenamiento.entrenado
    if (this.entrenado) {
      this.seleccionado = "Simulacion";
    } else {
      alert('El entrenamiento no fue exitoso, intentalo nuevamente para realizar la simulación. 😁');
    }
  }


  constructor(private entrenamiento: EntrenamientoService){
    
  }
}
