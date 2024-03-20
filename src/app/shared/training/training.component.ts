import { Component, Input} from '@angular/core';
import { DibujoComponent } from '../dibujo/dibujo.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [ DibujoComponent],
  templateUrl: './training.component.html'
})
export class TrainingComponent {
  @Input() datos: any;
  
}
