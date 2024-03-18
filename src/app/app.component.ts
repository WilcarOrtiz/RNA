import { LeerDatosService } from './services/leer-datos.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './shared/message/message.component';
import { DibujoComponent } from './shared/dibujo/dibujo.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, MessageComponent, DibujoComponent, SidebarComponent],
})
export class AppComponent {
  title = 'RNA';
  excelData: any[][] = [];
  pesos: number[][] = [];
  umbral: number[] = [];
  entradas: number = 0;
  salidas: number = 0;
  patrones: number = 0;

  constructor(private leerDatos: LeerDatosService) {}

  
  ngOnInit(): void {
    this.leerDatos
      .readExcelFile()
      .then((data) => {
        this.excelData = data;
        this.obtenerParametros();
      })
      .catch((error) => {
        console.error('Error al leer el archivo Excel:', error);
      });
  }

  obtenerParametros(): void {
    let contEntradas: number = 0;
    let contSalidas: number = 0;
    let encabezado: string[];

    this.excelData[0].forEach((item: string) => {
      encabezado = item.split('');
      if (encabezado[0] === 'S') {
        contEntradas++;
      }
      if (encabezado[0] === 'M') {
        contSalidas++;
      }
    });

    this.entradas = contEntradas;
    this.salidas = contSalidas;
    this.patrones = this.excelData.length - 1;
    this.InicializarPesosUmbral();
  }

  InicializarPesosUmbral() {
    this.pesos = [];
    for (let i = 0; i < this.entradas; i++) {
      this.pesos[i] = [];
      for (let j = 0; j < this.salidas; j++) {
        let val = Math.random() * 2 - 1;
        let val1 = Math.random() * 2 - 1;
        this.umbral[j] = val1;
        this.pesos[i][j] = val;
      }
    }
  }
}
