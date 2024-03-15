import { Component, Input, Injectable } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';

export interface node {
  id: string;
  label: string;
}

export interface links {
  id: string;
  source: string;
  target: string;
  label: string;
}

@Component({
  selector: 'app-dibujo',
  standalone: true,
  imports: [NgxGraphModule],
  templateUrl: './dibujo.component.html',
  styleUrl: './dibujo.component.css',
})
export class DibujoComponent {
  @Input({ required: true }) NumEntradas!: any;
  @Input({ required: true }) NumNeuronas!: any;
  //Declaracion de parametros
  neuronas: node[] = [];
  entrada: node[] = [];
  salida: node[] = [];
  nodos: node[] = [];

  //declaracion de enlaces
  links: links[] = [];

  constructor() {
    this.dibujar();
  }

  dibujar() {
    for (let i = 1; i <= 2; i++) {
      this.neuronas.push({
        id: `N${i}`,
        label: `N${i}`,
      });
    }
    for (let i = 1; i <= 4; i++) {
      this.entrada.push({
        id: `E${i}`,
        label: `E${i}`,
      });
    }
    for (let i = 1; i <= 2; i++) {
      this.salida.push({
        id: `S${i}`,
        label: `S${i}`,
      });
    }
    this.nodos = this.neuronas.concat(this.entrada, this.salida);

    this.entrada.map((item) => {
      this.neuronas.map((itemNeurona) => {
        this.links.push({
          id: `${item.id}-${itemNeurona.id}`,
          source: `${item.id}`,
          target: `${itemNeurona.id}`,
          label: 'is parent of',
        });
      });
    });

    this.neuronas.map((item, indexNeurona) => {
      this.salida.map((itemSalida, indexSalida) => {
        if (indexNeurona == indexSalida) {
          this.links.push({
            id: `${item.id}-${itemSalida.id}`,
            source: `${item.id}`,
            target: `${itemSalida.id}`,
            label: 'is parent of',
          });
        }
      });
    });
  }

  //por si8 quiero que tengan  puntz :'is parent of with arrow',
  getNodeColor(label: string): string {
    if (label.includes('S')) {
      return '#06308e'; // Color rojo si la etiqueta contiene 'S'
    } else if (label.includes('N')) {
      return '#05d5f9'; // Color verde si la etiqueta contiene 'N'
    } else if (label.includes('E')) {
      return '#2CD4C5'; // Color azul si la etiqueta contiene 'E'
    } else {
      return '#f6f6f6'; // Color predeterminado si no coincide ninguna condición
    }
  }
}
