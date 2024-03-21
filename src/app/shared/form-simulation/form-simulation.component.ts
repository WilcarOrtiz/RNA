import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SimulationService } from "../../service/simulation.service";
import { ExcelService } from "../../service/excel.service";
import { ParameterizationInitialService } from "../../service/parameterization-initial.service";
import { ButtonFileUploadComponent } from "../button-file-upload/button-file-upload.component";

@Component({
  selector: "app-form-simulation",
  standalone: true,
  templateUrl: "./form-simulation.component.html",
  styleUrls: [
    "./form-simulation.component.css",
    "../../styles/slider.style.css",
    "../../styles/button.style.css",
    "../../styles/input.style.css",
    "../../styles/select.style.css",
  ],
  imports: [ReactiveFormsModule, ButtonFileUploadComponent],
})
export class FormSimulationComponent {
  pesos: any;
  umbral: any;
  Data: any;
  entradas: any;
  salidas: any;
  arrayEntrada: number[] = [];
  arraySalida: number[] = [];
  @Input() activacion = "";
  @Output() cambioSele = new EventEmitter<any>();

  cambiarSele() {
    this.cambioSele.emit('Simulacion');
  }

  form = new FormGroup({
    banco: new FormControl(""),
    pesosumbrales: new FormControl(""),
    patron: new FormControl("bancoDatos"),
  });


  division(){
    if (this.form.get('patron')!.value != 'bancoDatos') {
      let data = this.form.get('patron')!.value
      let partes = data!.split(':');
      let nEntradas= partes[0].split(','); 
      let nSalidas = partes[1].split(',');
      if (nEntradas.length == this.entradas && nSalidas.length == this.salidas) {
        this.arrayEntrada = nEntradas.map(Number); 
        this.arraySalida = nSalidas.map(Number); 
      } else {
        alert(
          "No concuerda la cantidad de entradas y/o salidas a las del banco de datos. ❌"
        );
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.division();
      this.leerPesosUmbrales(this.form.get("pesosumbrales")!.value).then(() => {
        this.leerExcel(this.form.get("banco")!.value).then(() => {
          this.simulacion();
          console.log(this.simulation.YD_YR);
          this.cambiarSele()
        });
      });
    } else {
      alert("Por favor, llena todos los campos del formulario.");
    }
  }

  cargarArchivo(event: any, param: string) {
    if (event.target.files && event.target.files.length) {
      const archivo = event.target.files[0];
      this.form.get(param)?.setValue(archivo);
    }
  }

  leerPesosUmbrales(event: any) {
    return new Promise<void>((resolve, reject) => {
      this.excelService
        .readExcelPesosUmbrales(event)
        .then((data) => {
          this.pesos = data.pesos;
          this.umbral = data.umbral[0];
          resolve();
        })
        .catch((error) => {
          console.error("Error al leer el archivo:", error);
          reject(error);
        });
    });
  }

  leerExcel(event: any) {
    return new Promise<void>((resolve, reject) => {
      this.excelService
        .readExcelBD(event)
        .then((e) => {
          this.Data = e;
          let resultado = this.parameterizationInitialService.NumberSaEnPa(
            this.Data
          );
          if (resultado) {
            this.entradas = resultado.NumEntrada;
            this.salidas = resultado.NumSalida;
            resolve();
          } else {
            reject("No se cargaron los patrones de entrada");
          }
        })
        .catch((error) => {
          reject(error); // Manejamos el error de la lectura del archivo
        });
    });
  }

  simulacion() {
    this.simulation.simulacion(
      this.form.get("patron")?.value == "bancoDatos" ? false : true, // true cuando es patron , falso cuando es un conjunto de patrones
      this.Data, // es la que te da la funcion readExcelBD (osea lo mismo del entrenamiento)
      this.arrayEntrada, // informacion del input de patron de entrada en forma de vector
      this.arraySalida, // informacion del input de patron de salida en forma de vector
      this.pesos,
      this.umbral,
      this.entradas,
      this.salidas,
      this.activacion //codigo de la funcion el del select (solo muestras el selec de las funcuones de activacion)
    );
  }

  constructor(
    private simulation: SimulationService,
    private excelService: ExcelService,
    private parameterizationInitialService: ParameterizationInitialService
  ) {}
}

/*
  } */
