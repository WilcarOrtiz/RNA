import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule, ApexDataLabels, ApexStroke, ApexFill } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { SimulationService } from '../../service/simulation.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill
};

@Component({
  selector: 'app-graph-salida',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './graph-salida.component.html',
})
export class GraphSalidaComponent implements OnInit{
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {}; 
  data: any;

  
  ngOnInit() {
    this.data = this.simulation.YD_YR;
    
    // Generar las series de forma dinámica
    let series = [];
    if (this.data.length > 0) {
      let numOutputs = this.data[0].yd.length;
      for (let i = 0; i < numOutputs; i++) {
        series.push({
          name: `yd salida ${i + 1}`,
          data: this.data.map((item: { yd: any[]; }) => item.yd[i])
        });
        series.push({
          name: `yr salida ${i + 1}`,
          data: this.data.map((item: { yr: any[]; }) => item.yr[i])
        });
      }
    }
    this.chartOptions = {
      series: series,
      chart: {
        height: 350,
        type: "line", 
      },stroke: {
        curve: 'smooth',
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        }
      },
      title: {
        text: "YD (Salida deseada) vs YR (Salida real)"
      },
      xaxis: {
        categories: this.data.map((item: any, index: number) => `Salida ${index + 1}`)
      },
      dataLabels: {
        enabled: true
      },
      
    };
}

  constructor(private simulation: SimulationService) {
  }

}
