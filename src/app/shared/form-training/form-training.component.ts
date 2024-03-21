import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { FunctionsService } from "../../func/functions.service";
import { ExcelService } from "../../service/excel.service";
import { ParameterizationInitialService } from "../../service/parameterization-initial.service";
import { EntrenamientoService } from "../../service/training.service";

@Component({
  selector: "app-form-training",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./form-training.component.html",
})
export class FormTrainingComponent {
  listFunciones: any[];
  pesosInicial: number[][] = [];
  umbralInicial: Array<number> = [];
  Data: any[][] = [];
  entradas = 0;
  salidas = 0;
  patrones = 0;
  pesos: number[][] = [];
  umbral: Array<number> = [];
  form = new FormGroup({
    banco: new FormControl(),
    function1: new FormControl(""),
    function2: new FormControl(""),
    learningRate: new FormControl(0),
    iterations: new FormControl(0, [Validators.required, Validators.min(1)]),
    maxError: new FormControl(0),
  });

  @Output() cambioDatosNieto = new EventEmitter<any>();

  cambiarDatos(nuevoSeleccionado: string) {
    let datos = {
      entradas: this.entradas,
      salidas: this.salidas,
      patrones: this.patrones,
      pesos: this.pesos,
      umbral: this.umbral,
      seleccionado: nuevoSeleccionado,
    };
    console.log(datos);
    this.cambioDatosNieto.emit(datos);
  }
  //Funcion que valida que todos los campos del form esten llenos

  cargarArchivo(event: any) {
    if (event.target.files && event.target.files.length) {
      const archivo = event.target.files[0];
      this.form.get("banco")?.setValue(archivo);
    }
  }
  onSubmit() {
    if (this.form.valid) {
      this.leerExcel(this.form.get("banco")?.value);
      this.IniciarEntrenamiento();
    } else {
      alert("Por favor, llena todos los campos del formulario.");
    }
  }

  leerExcel(event: any) {
    return new Promise<void>((resolve, reject) => {
      this.excelService
        .readExcelBD(event)
        .then((e) => {
          this.Data = e;
          console.log(this.Data);
          let resultado = this.parameterizationInitialService.NumberSaEnPa(
            this.Data
          );
          if (resultado) {
            this.entradas = resultado.NumEntrada;
            this.salidas = resultado.NumSalida;
            this.patrones = resultado.patrones; // Mover la llamada a cambiarDatos aquí
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

  IniciarEntrenamiento() {
    // Esperamos a que los datos se lean correctamente antes de iniciar el entrenamiento
    this.leerExcel(this.form.get("banco")?.value)
      .then(() => {
        this.InicializarPesosUmbral();
        this.entrenamientoServicio.entrenamiento(
          this.Data,
          this.pesos,
          this.umbral,
          this.form.get("iterations")?.value != null
            ? this.form.get("iterations")?.value!
            : 0,
          this.form.get("learningRate")?.value != null
            ? this.form.get("learningRate")?.value!
            : 0,
          this.form.get("maxError")?.value != null
            ? this.form.get("maxError")?.value!
            : 0,
          this.entradas,
          this.salidas,
          this.form.get("function2")?.value != null
            ? this.form.get("function2")?.value!
            : "", //codigo de la funcion activacion
          this.form.get("function1")?.value != null
            ? this.form.get("function1")?.value!
            : "" // codigo del algoritmo de entrenamiento
        );
        this.cambiarDatos("Entrenamiento");
        /*
        console.log(
          "Para ver si se mantiene Peso inicial: ",
          this.pesosInicial,
          " Umbral inicial:  ",
          this.umbralInicial
        ); */
      })
      .catch((error) => {
        console.error("Error al leer el archivo:", error);
      });
  }

  InicializarPesosUmbral() {
    let resultado = this.parameterizationInitialService.InitializePesosUmbral(
      this.entradas,
      this.salidas
    );
    // console.log(resultado);
    this.pesos = resultado.pesos;
    this.umbral = resultado.umbral;
    this.pesosInicial = resultado.pesos;
    this.umbralInicial = resultado.umbral;

    /*    console.log(
      "Pa ver los pesos inicial ",
      this.pesos,
      " Umbral   ",
      this.umbral
    ); */
  }

  //Constructor que trae la lista de las funciones de entramiento y activacion
  constructor(
    private funciones: FunctionsService,
    private excelService: ExcelService,
    private parameterizationInitialService: ParameterizationInitialService,
    private entrenamientoServicio: EntrenamientoService
  ) {
    this.listFunciones = this.funciones.listFunction;
  }
}
