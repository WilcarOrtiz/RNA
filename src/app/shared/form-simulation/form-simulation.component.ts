import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-simulation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-simulation.component.html',
  styleUrl: './form-simulation.component.css'
})
export class FormSimulationComponent {
  form = new FormGroup({
    banco: new FormControl(''),
    pesosumbrales: new FormControl(''),
  });

  onSubmit(){
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      alert('Por favor, llena todos los campos del formulario.');
    }
  }
}
