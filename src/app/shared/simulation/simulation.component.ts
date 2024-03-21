import { Component } from "@angular/core";
import { GraphSalidaComponent } from "../graph-salida/graph-salida.component";

@Component({
  selector: "app-simulation",
  standalone: true,
  imports: [GraphSalidaComponent],
  templateUrl: "./simulation.component.html",
})
export class SimulationComponent {
  
}
