import { ExcelService } from "./service/excel.service";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MessageComponent } from "./shared/message/message.component";
import { DibujoComponent } from "./shared/dibujo/dibujo.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { TrainingComponent } from "./shared/training/training.component";
import { SimulationComponent } from "./shared/simulation/simulation.component";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    imports: [
        CommonModule,
        RouterOutlet,
        MessageComponent,
        DibujoComponent,
        SidebarComponent,
        TrainingComponent,
        SimulationComponent,
    ]
})
export class AppComponent {
  seleccionado = ''
  datos = ''
  recibirDatos(param: any) {
    console.log(param)
    this.datos = param;
    this.seleccionado = param.seleccionado
  }
}
