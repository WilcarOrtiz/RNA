import { Component } from "@angular/core";
import { SimulationService } from "../../service/simulation.service";

@Component({
  selector: "app-simulation",
  standalone: true,
  imports: [],
  templateUrl: "./simulation.component.html",
})
export class SimulationComponent {
  array: any;
  constructor(private simulation: SimulationService){
   
  }
}
