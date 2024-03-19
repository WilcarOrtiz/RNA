import { Injectable } from "@angular/core";
import { FunctionsService } from "../func/functions.service";
import { ExcelService } from "./excel.service";
import { ParameterizationInitialService } from "./parameterization-initial.service";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  pesos: number[][] = [];
  umbral: number[] = [];
  NSalidas: number = 0; //numero de salidas
  NEntradas: number = 0; //numero de entradas
  SD: number[][] = []; //Salida Esperada/deseada
  Resultado: any[] = [];
  PE: number[][] = []; //Patrones de entrada
  YRi: number[][] = []; //salida funcion activacion
  CodActivacion: string = "";
  Si: number[] = []; //salida funcion soma
  SalidaAtenuada: number[] = []; // salida atenuada

  constructor(
    private funcion: FunctionsService,
    private funcionBase: ExcelService,
    private parametrizacion: ParameterizationInitialService
  ) {}

  simulacion(
    Data: Array<Array<number>>,
    pesosEntrante: Array<Array<number>>,
    umbralEntrante: Array<number>,
    Nentrada: number,
    Nsalida: number,
    codActivacion: any
  ) {
    this.NSalidas = Nsalida;
    this.pesos = pesosEntrante;
    this.umbral = umbralEntrante;
    let resultado = this.parametrizacion.GetPESDR(Data, Nentrada, Nsalida);
    this.PE = resultado.PE;
    this.SD = resultado.SD;
    this.Resultado = resultado.Result;

    for (let i = 0; i < this.PE.length; i++) {
      let patron = this.PE[i];
      this.YRi[i] = [];
      for (let j = 0; j < Nsalida; j++) {
        let suma = 0,
          siu = 0;
        for (let x = 0; x < patron.length; x++) {
          suma = suma + patron[x] * this.pesos[x][j];
        }
        siu = suma - this.umbral[j];
        let val1 = this.funcion.executeFunction(codActivacion, siu);
        this.YRi[i][j] = val1;
      }
      console.log(patron, ": ", this.YRi[i]);
    }
  }
}
