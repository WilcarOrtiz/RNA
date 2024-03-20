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
  //boton de la simulación
  //para leer los pesos umbrale optimos (los que guardamos)
  // leerPesosUmbrales(event: any) {
  //   this.excelService
  //     .readExcelPesosUmbrales(event)
  //     .then((data) => {
  //       this.pesos = data.pesos;
  //       this.umbral = data.umbral[0];
  //     })
  //     .catch((error) => {
  //       console.error("Error al leer el archivo:", error);
  //     });
  // }

  //Llamar en el boton simular
  //iniciar simulacion
  // simulacion() {
  //   this.simulacio.simulacion(
  //     this.Data,
  //     this.pesos,
  //     this.umbral,
  //     this.entradas,
  //     this.salidas,
  //     "1234"
  //   );
  // }

  // grafica de simulacion YD_YR (esta en el archivo de simulacion) this.simulacio.YD_YR
  //grafica de entrenamiento iteracionErrorArray (esta en el archivo training)   this.entrenamientoServicio.iteracionErrorArray
}
