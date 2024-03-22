import { Component, ViewChild } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule, ApexStroke, ApexFill, ApexMarkers, ApexOptions } from 'ng-apexcharts';
import { EntrenamientoService } from '../../service/training.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;

};
@Component({
  selector: 'app-graph-error',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: 'graph-error.component.html',
})
export class GraphErrorComponent {
  datos!: any;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {}; // Inicialización aquí

  constructor(private data: EntrenamientoService) {
    this.datos = data.iteracionErrorArray;
    const iteraciones = this.datos.map((item: { i: any; }) => item.i);
    const dataError = this.datos.map((item: { error: any; }) => item.error);
    this.chartOptions.series = [
      {
        name: 'Error de iteración',
        data: dataError.map((item: any) => {
          if (typeof item === 'number') {
            return item;
          } else {
            return null
          }})
      }
    ];
    this.chartOptions.chart = {
      height: 350,
      type: 'area'
    };
    this.chartOptions.title = {
      text: 'Error de Iteración vs Iteración'
    };
    this.chartOptions.xaxis = {
      categories: iteraciones
    };
  }
  }
