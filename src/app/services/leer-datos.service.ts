import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class LeerDatosService {
  constructor() {}
  excelData: any;
  public readExcelFile(): Promise<any[]> {
    const filePath = 'assets/db/informacion.xlsx';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true); // Cambiado a asíncrono para asegurar que se complete antes de retornar
    xhr.responseType = 'arraybuffer';
    xhr.send();

    // Utilizar una promesa para manejar el resultado de la solicitud
    return new Promise<any[][]>((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          const arrayBuffer = xhr.response;
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const matriz: any[][] = [];
          for (let i = 0; i < this.excelData.length; i++) {
            matriz.push(Object.values(this.excelData[i]));
          }
          resolve(this.excelData);
        } else {
          reject(new Error('Failed to load Excel file'));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Error loading Excel file'));
      };
    });
  }
}
