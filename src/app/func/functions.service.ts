import { Injectable } from "@angular/core";

interface Funcion {
  (...args: any[]): any;
}

class Funciones {
  type: string;
  name: string;
  code: string;
  funcion: Funcion;
  constructor(type: string, name: string, code: string, funcion: Funcion) {
    this.type = type;
    this.name = name;
    this.code = code;
    this.funcion = funcion;
  }
}

@Injectable({
  providedIn: "root",
})
export class FunctionsService {
  listFunction: Array<Funciones> = [];

  constructor() {
    const limitadorDuro = (Si: number | number[]): number[] => {
      if (Array.isArray(Si)) {
        return Si.map((element) => (element >= 0 ? 1 : 0));
      } else {
        return [Si >= 0 ? 1 : 0];
      }
    };
    const reglaDelta: Funcion = (
      pesos: Array<Array<number>>,
      patron: Array<number>,
      errorlineal: Array<number>,
      rata: number,
      umbral: Array<number>
    ) => {
      let nuevoPesos: number[][] = [],
        nuevoUmbral: number[] = [];

      for (let i = 0; i < pesos.length; i++) {
        nuevoPesos[i] = new Array(pesos[0].length);
      }

      for (let j = 0; j < pesos[0].length; j++) {
        nuevoUmbral[j] = parseFloat(
          (umbral[j] + rata * errorlineal[j] * 1).toFixed(2)
        );
        for (let i = 0; i < pesos.length; i++) {
          nuevoPesos[i][j] = parseFloat(
            (pesos[i][j] + rata * errorlineal[j] * patron[i]).toFixed(2)
          );
        }
      }
      return { pesos: nuevoPesos, umbral: nuevoUmbral };
    };

    this.listFunction = [
      new Funciones("activacion", "Limitador Duro", "1234", limitadorDuro),
      new Funciones("entrenamiento", "Regla Delta", "5678", reglaDelta),
    ];
  }

  executeFunction(code: string, ...args: any[]): any {
    console.log(code)
    console.log(args)
    const foundFunction = this.listFunction.find(
      (funcion) => funcion.code === code
    );

    if (!foundFunction) {
      throw new Error(`Función con código "${code}" no encontrada.`);
    }

    return foundFunction.funcion(...args);
  }
}
