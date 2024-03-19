import { ExcelService } from "./service/excel.service";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MessageComponent } from "./shared/message/message.component";
import { DibujoComponent } from "./shared/dibujo/dibujo.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { ParameterizationInitialService } from "./service/parameterization-initial.service";
import { EntrenamientoService } from "./service/training.service";
import { SimulationService } from "./service/simulation.service";

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
  ],
})
export class AppComponent {
  title = "RNA";
  excelData: any[][] = [];
  Data: any[][] = [];
  pesos: number[][] = [];
  umbral: Array<number> = [];
  entradas: number = 0;
  salidas: number = 0;
  patrones: number = 0;

  constructor(
    private excelService: ExcelService,
    private parameterizationInitialService: ParameterizationInitialService,
    private entrenamientoServicio: EntrenamientoService,
    private simulacio: SimulationService
  ) {}

  //inicializar pesos umbrales (entrenamiento)
  InicializarPesosUmbral() {
    let resultado = this.parameterizationInitialService.InitializePesosUmbral(
      this.entradas,
      this.salidas
    );
    this.pesos = resultado.pesos;
    this.umbral = resultado.umbral;
  }

  //para iniciar el entrenamiento
  IniciarEntrenamiento() {
    this.entrenamientoServicio.entrenamiento(
      this.Data,
      this.pesos,
      this.umbral,
      300,
      0.1,
      0.01,
      this.entradas,
      this.salidas,
      this.patrones,
      "1234", //codigo de la funcion activacion
      "5678" // codigo del algoritmo de entrenamiento
    );
  }

  //para leer base de informacion
  leerExcel(event: any) {
    this.excelService
      .readExcelBD(event)
      .then((e) => {
        this.Data = e;
        let resultado = this.parameterizationInitialService.NumberSaEnPa(
          this.Data
        );
        resultado
          ? ((this.entradas = resultado.NumEntrada),
            (this.salidas = resultado.NumSalida),
            (this.patrones = resultado.patrones))
          : alert("No se cargaron los patrones de entrada");
      })
      .catch();
  }

  //para leer los pesos umbrale optimos (los que guardamos)
  leerPesosUmbrales(event: any) {
    this.excelService
      .readExcelPesosUmbrales(event)
      .then((data) => {
        this.pesos = data.pesos;
        this.umbral = data.umbral[0];
      })
      .catch((error) => {
        console.error("Error al leer el archivo:", error);
      });
  }

  //iniciar simulacion
  simulacion() {
    this.simulacio.simulacion(
      this.Data,
      this.pesos,
      this.umbral,
      this.entradas,
      this.salidas,
      "1234"
    );
  }

  // grafica de simulacion YD_YR (esta en el archivo de simulacion) this.simulacio.YD_YR
  //grafica de entrenamiento iteracionErrorArray (esta en el archivo training)   this.entrenamientoServicio.iteracionErrorArray
}
