import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
    horario: any[]=[{
      tipo_horario:'Diurno'
    },
    {
      tipo_horario:'Vespertino'
    },];

  clase = new FormGroup({
    cod_clase: new FormControl('',[]),
    nombre:new FormControl('',[]),
    sigla_asignatura: new FormControl('',[]),
    semestre: new FormControl('',[]),
    docente:new FormGroup('',[]),
    horario: new FormGroup('this.horario'),
  });
  clases: any[]=[];
  KEY_CLASES ='clases';
  constructor(private usuarioService: UserService) { }

  async ngOnInit() {
    await this.cargarClases();
  }

  async cargarClases(){
    this.clases = await this.usuarioService.obtenerClases(this.KEY_CLASES);
  }
  async crearClase(){
  var respuesta: boolean = await this.usuarioService.agregarClase(this.KEY_CLASES, this.clase.value);
  if (respuesta) {
    alert('clase creada!');
    await this.cargarClases();
  } else {
    alert('clase ya existe!');
  }
  } 
}

