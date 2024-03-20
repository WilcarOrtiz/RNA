import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-form-simulation",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./form-simulation.component.html",
  styleUrl: "./form-simulation.component.css",
})
export class FormSimulationComponent {
  form = new FormGroup({
    banco: new FormControl(""),
    pesosumbrales: new FormControl(""),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      alert("Por favor, llena todos los campos del formulario.");
    }
  }

  /*  simulacion(
    isInput: boolean, // true cuando es patron , falso cuando es un conjunto de patrones
    Data: Array<Array<number>>, // es la que te da la funcion readExcelBD (osea lo mismo del entrenamiento)
    inputInfoPatronEntrada: Array<number>, // informacion del input de patron de entrada en forma de vector
    inputInfoPatronSalida: Array<number>, // informacion del input de patron de salida en forma de vector
    pesosEntrante: Array<Array<number>>, es la informacion que obtienes al ejecutar la funcion readExcelPesosUmbrales
    umbralEntrante: Array<number>, es la informacion que obtienes al ejecutar la funcion readExcelPesosUmbrales
    Nentrada: number,
    Nsalida: number,
    codActivacion: string  //codigo de la funcion el del select (solo muestras el selec de las funcuones de activacion)
  ): */
}
