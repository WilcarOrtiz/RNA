import { Injectable } from "@angular/core";
import * as XLSX from "XLSX";

interface Data {
  threshold: number[] | number[][];
  weights: number[] | number[][];
}

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}
  nombreDocumento: string = "";
  relativePath: string = "assets/db/";

  generateFileName(nombreCompleto: string): string {
    let puntoPosicion = nombreCompleto.lastIndexOf(".");

    if (puntoPosicion > -1) {
      return nombreCompleto.substring(0, puntoPosicion) + "_optimo";
    } else {
      return nombreCompleto + "_optimo";
    }
  }

  SaveExcelPesosUmbrales(pesos: any, umbral: any) {
    const wb = XLSX.utils.book_new();
    const ws_pesos = XLSX.utils.aoa_to_sheet(pesos);
    const ws_umbral = XLSX.utils.aoa_to_sheet([umbral]);
    XLSX.utils.book_append_sheet(wb, ws_pesos, "Pesos");
    XLSX.utils.book_append_sheet(wb, ws_umbral, "Umbral");
    const filePath = `${this.nombreDocumento}.xlsx`;
    XLSX.writeFile(wb, filePath);
  }

  readExcelPesosUmbrales(event: any): Promise<{ pesos: any; umbral: any }> {
    return new Promise((resolve, reject) => {
      const archivo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const pesosSheet = XLSX.read(data, { type: "array" }).Sheets["Pesos"];
        const umbralSheet = XLSX.read(data, { type: "array" }).Sheets["Umbral"];
        const pesosData = XLSX.utils.sheet_to_json(pesosSheet, { header: 1 });
        const umbralData = XLSX.utils.sheet_to_json(umbralSheet, { header: 1 });
        resolve({ pesos: pesosData, umbral: umbralData });
      };

      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(archivo);
    });
  }

  readExcelBD(file: File): Promise<any[]> {
    let data: any;
    this.nombreDocumento = this.generateFileName(file.name);
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    return new Promise<any[][]>((resolve, reject) => {
      fileReader.onload = (e) => {
        var workbook = XLSX.read(fileReader.result, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const matriz: any[][] = [];
        for (let i = 0; i < data.length; i++) {
          matriz.push(Object.values(data[i]));
        }
        resolve(data);
      };
    });
  }
  
}
