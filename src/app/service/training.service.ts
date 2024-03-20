import { Injectable } from "@angular/core";
import { FunctionsService } from "../func/functions.service";
import { ExcelService } from "./excel.service";
import { ParameterizationInitialService } from "./parameterization-initial.service";

export interface IterationError {
  i: number;
  error: number;
}

@Injectable({
  providedIn: "root",
})
export class EntrenamientoService {
  constructor(
    private funcion: FunctionsService,
    private funcionBase: ExcelService,
    private parametrizacion: ParameterizationInitialService
  ) {}

  pesos: number[][] = [];
  umbral: number[] = [];
  NSalidas: number = 0; //numero de salidas
  NEntradas: number = 0; //numero de entradas
  SD: number[][] = []; //Salida Esperada/deseada
  Resultado: any[] = [];
  PE: number[][] = []; //Patrones de entrada
  YRi: number[] = []; //salida funcion activacion
  EPi: number[] = []; // error del patron
  CodActivacion: string = "";
  CodAlgoEntrenamiento: string = "";
  ErrorIteracion: number[] = []; // almacena el error de la iteracion
  ErrorLineal: number[] = [];
  Si: number[] = []; //salida funcion soma
  SalidaAtenuada: number[] = []; // salida atenuada
  iteracionErrorArray: IterationError[] = []; // Array para almacenar la iteración y su error

  entrenamiento(
    Data: Array<Array<number>>,
    pesosEntrante: Array<Array<number>>,
    umbralEntrante: Array<number>,
    NumIteracionesMaxima: number,
    RataAprendizaje: number,
    ErrorMaximoPermitido: number,
    Nentrada: number,
    Nsalida: number,
    CodActivacion: string,
    CodAlgoEntrenamiento: string
  ) {
    console.log({
      Data: Data,
      pesosEntrante: pesosEntrante,
      umbralEntrante: umbralEntrante,
      NumIteracionesMaxima: NumIteracionesMaxima,
      RataAprendizaje: RataAprendizaje,
      ErrorMaximoPermitido: ErrorMaximoPermitido,
      Nentrada: Nentrada,
      Nsalida: Nsalida,
      CodActivacion: CodActivacion,
      CodAlgoEntrenamiento: CodAlgoEntrenamiento
    });
    
    this.NSalidas = Nsalida;
    this.pesos = pesosEntrante;
    this.umbral = umbralEntrante;
    this.CodActivacion = CodActivacion;
    let resultado = this.parametrizacion.GetPESDR(Data, Nentrada, Nsalida);
    this.PE = resultado.PE;
    this.SD = resultado.SD;
    this.Resultado = resultado.Result;
    this.CodAlgoEntrenamiento = CodAlgoEntrenamiento;

    let iteracionActual = 0;
    let errorIteracion = 0;

    while (iteracionActual < NumIteracionesMaxima) {
      for (let i = 0; i < this.PE.length; i++) {
        let patron = this.PE[i];
        this.Paso1_calcularSalidaFuncionSoma(patron);
        this.Paso2_calcularSalidaAtenuada();
        this.Paso3_calcularSalidadDeLaRed();
        for (let j = 0; j < this.NSalidas; j++) {
          this.ErrorLineal.push(
            parseFloat((this.SD[i][j] - this.YRi[j]).toFixed(2))
          );
        }
        this.EPi.push(
          Math.abs(
            this.ErrorLineal.reduce((suma, numero) => suma + numero, 0)
          ) / this.NSalidas
        );
        let result = this.funcion.executeFunction(
          this.CodAlgoEntrenamiento,
          this.pesos,
          patron,
          this.ErrorLineal,
          RataAprendizaje,
          this.umbral
        );
        this.vaciarVectores();
        this.pesos = result.pesos;
        this.umbral = result.umbral;
      }

      errorIteracion = parseFloat(
        (
          this.EPi.reduce((suma, numero) => suma + numero) / this.EPi.length
        ).toFixed(2)
      );
      this.ErrorIteracion.push(errorIteracion);
      iteracionActual++;
      this.iteracionErrorArray.push({
        i: iteracionActual,
        error: errorIteracion,
      });
      if (errorIteracion <= ErrorMaximoPermitido) {
        this.funcionBase.SaveExcelPesosUmbrales(this.pesos, this.umbral);
        break;
      }
    }
  }

  vaciarVectores() {
    this.pesos = [];
    this.umbral = [];
    this.YRi = [];
    this.Si = [];
    this.SalidaAtenuada = [];
    this.ErrorLineal = [];
  }

  Paso3_calcularSalidadDeLaRed() {
    this.YRi = this.funcion.executeFunction(
      this.CodActivacion,
      this.SalidaAtenuada
    );
  }

  Paso2_calcularSalidaAtenuada() {
    for (let i = 0; i < this.Si.length; i++) {
      this.SalidaAtenuada.push(
        parseFloat((this.Si[i] - this.umbral[i]).toFixed(2))
      );
    }
  }

  Paso1_calcularSalidaFuncionSoma(S: Array<number>) {
    let SumCol: number = 0;
    for (let j = 0; j < this.NSalidas; j++) {
      for (let i = 0; i < this.pesos.length; i++) {
        SumCol += S[i] * this.pesos[i][j];
      }
      this.Si.push(parseFloat(SumCol.toFixed(2)));
      SumCol = 0;
    }
  }
}
