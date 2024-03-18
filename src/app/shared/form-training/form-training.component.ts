import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-training',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-training.component.html',
  styleUrl: './form-training.component.css'
})
export class FormTrainingComponent {
  form = new FormGroup({
    banco: new FormControl(''),
    function1: new FormControl(''),
    function2: new FormControl(''),
    learningRate: new FormControl(''),
    iterations: new FormControl('', [Validators.required, Validators.min(1)]),
    maxError: new FormControl('')
  });

  onSubmit(){
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      alert('Por favor, llena todos los campos del formulario.');
    }
  }
}
