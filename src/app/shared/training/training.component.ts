import { Component, Input} from '@angular/core';
import { DibujoComponent } from '../dibujo/dibujo.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraphErrorComponent } from '../graph-error/graph-error.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [ DibujoComponent, NgApexchartsModule, GraphErrorComponent],
  templateUrl: './training.component.html'
})
export class TrainingComponent {
  @Input() datos: any;
}
