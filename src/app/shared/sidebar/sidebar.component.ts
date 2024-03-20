import { Component, EventEmitter, Output } from '@angular/core';
import { FormTrainingComponent } from '../form-training/form-training.component';
import { FormSimulationComponent } from '../form-simulation/form-simulation.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormTrainingComponent, FormSimulationComponent],
  templateUrl: "sidebar.component.html",
  styleUrl: "sidebar.component.css"
})
export class SidebarComponent {
  seleccionado = "Entrenamiento";
  @Output() seleccionadoChange = new EventEmitter<string>();
  
  cambiarDatos(param: any) {
    this.seleccionadoChange.emit(param);
  }
}
