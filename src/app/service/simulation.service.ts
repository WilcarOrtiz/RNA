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
    private funcionMatematicas: FunctionsService,
    private parametrizacion: ParameterizationInitialService
  ) {}

  simulacion(
    isInput: boolean, // true cuando es patron falso cuando es un conjunto de patrones
    Data: Array<Array<number>>,
    inputInfoPatronEntrada: Array<number>, // el vector del input patron de entrada
    inputInfoPatronSalida: Array<number>, // el vector con la info del input patron de salida deseada
    pesosEntrante: Array<Array<number>>,
    umbralEntrante: Array<number>,
    Nentrada: number,
    Nsalida: number,
    codActivacion: string //codigo de la funcion
  ): YD_YR[] {
    this.NSalidas = Nsalida;
    this.pesos = pesosEntrante;
    let resultado = this.parametrizacion.GetPESDR(Data, Nentrada, Nsalida);
    this.PE = resultado.PE; //patron
    this.SD = resultado.SD; // salida deseada
    this.Resultado = resultado.Result; // en caso de tener resultado especifico
    umbralEntrante.map((e) => this.umbral.push(e));

    //true para cuando es un solo patron
    if (isInput) {
      //lo guardo en la posicion 0 ya que es un matriz pero el proceso es para un solo patron
      this.YRi[0] = this.calculateYRi(
        inputInfoPatronEntrada,
        this.umbral,
        this.pesos,
        this.funcionMatematicas,
        codActivacion
      );
      this.YD_YR.push({
        yd: inputInfoPatronSalida,
        yr: this.YRi[0],
      });
    } else {
      for (let i = 0; i < this.PE.length; i++) {
        let patron = this.PE[i];
        this.YRi[i] = this.calculateYRi(
          patron,
          this.umbral,
          this.pesos,
          this.funcionMatematicas,
          codActivacion
        );
      }
      for (let i = 0; i < this.PE.length; i++) {
        this.YD_YR.push({
          yd: this.SD[i],
          yr: this.YRi[i],
        });
      }
    }
    return this.YD_YR;
  }

  calculateYRi(
    patron: any,
    umbral: number[],
    pesos: number[][],
    funcionMatematicas: FunctionsService,
    codActivacion: string
  ) {
    const YRi = [];
    for (let j = 0; j < umbral.length; j++) {
      let suma = 0;
      for (let x = 0; x < patron.length; x++) {
        suma = suma + patron[x] * pesos[x][j];
      }
      suma = suma - umbral[j];
      let val = funcionMatematicas.executeFunction(codActivacion, suma);
      YRi.push(parseFloat(val.toFixed(2)));
    }
    return YRi;
  }
}
