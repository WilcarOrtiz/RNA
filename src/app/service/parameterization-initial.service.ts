import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ParameterizationInitialService {
  constructor() {}

  //numero de entrada salidas y patrones
  NumberSaEnPa(
    excelData: any
  ): { NumEntrada: number; NumSalida: number; patrones: number } {
    let contEntradas: number = 0,
      contSalidas: number = 0;
    let encabezado: string[];

    excelData[0].forEach((item: string) => {
      encabezado = item.split("");
      if (encabezado[0] === "S") {
        contEntradas++;
      }
      if (encabezado[0] === "M") {
        contSalidas++;
      }
    });
    return {
      NumEntrada: contEntradas,
      NumSalida: contSalidas,
      patrones: excelData.length - 1,
    };
  }

  GetPESDR(
    Data: Array<Array<number>>,
    M: number,
    N: number
  ): { PE: any; SD: any; Result: any } {
    let PE = Data.slice(1).map((row) => row.slice(0, M));
    let SD = Data.slice(1).map((row) => row.slice(M, M + N));
    let Result = Data.slice(1).flatMap((row) => row.slice(M + N));

    return { PE: PE, SD: SD, Result: Result };
  }

  InitializePesosUmbral(
    NumEntradas: number,
    NumSalidas: number
  ): { pesos: Array<Array<number>>; umbral: Array<number> } {
    let pesos: number[][] = [],
      umbral: number[] = [];
    for (let i = 0; i < NumEntradas; i++) {
      pesos[i] = [];
      for (let j = 0; j < NumSalidas; j++) {
        let val = parseFloat((Math.random() * 2 - 1).toFixed(2));
        let val1 = parseFloat((Math.random() * 2 - 1).toFixed(2));
        umbral[j] = val1;
        pesos[i][j] = val;
      }
    }
    return { pesos: pesos, umbral: umbral };
  }
}
