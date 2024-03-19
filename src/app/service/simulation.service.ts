import { Injectable } from "@angular/core";
import { FunctionsService } from "../func/functions.service";
import { ExcelService } from "./excel.service";
import { ParameterizationInitialService } from "./parameterization-initial.service";

export interface YD_YR {
  yd: Array<number>;
  yr: Array<number>;
}

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
  Si: number[] = []; //salida funcion soma
  YD_YR: YD_YR[] = [];
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
    let resultado = this.parametrizacion.GetPESDR(Data, Nentrada, Nsalida);
    this.PE = resultado.PE;
    this.SD = resultado.SD;
    this.Resultado = resultado.Result;
    umbralEntrante.map((e) => this.umbral.push(e));

    for (let i = 0; i < this.PE.length; i++) {
      let patron = this.PE[i];
      this.YRi[i] = [];
      for (let j = 0; j < this.umbral.length; j++) {
        let suma = 0;
        for (let x = 0; x < patron.length; x++) {
          suma = suma + patron[x] * this.pesos[x][j];
        }
        suma = suma - this.umbral[j];
        let val = suma >= 0 ? 1 : 0;
        this.YRi[i][j] = parseFloat(val.toFixed(2));
      }
    }

    for (let i = 0; i < this.PE.length; i++) {
      this.YD_YR.push({
        yd: this.SD[i],
        yr: this.YRi[i],
      });
      // console.log(this.PE[i], " Deseada: ", this.SD[i], "  Red:", this.YRi[i]);
    }

    ///  console.log("YD VS YR", this.YD_YR);
  }
}
