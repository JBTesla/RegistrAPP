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
    cod_clase: new FormControl(''),
    nombre:new FormControl('',),
    sigla_asignatura: new FormControl(''),
    semestre: new FormControl(''),
    docente:new FormControl(''),
    horario: new FormControl('this.horario'),
  });
  clases: any[]=[];
  KEY_CLASES ='clases';

  //docente: any;
  usuarios: any[]=[];
  KEY_USUARIOS='usuarios';


  constructor(private usuarioService: UserService) { }

  async ngOnInit() {
    await this.cargarDocentes();
    await this.cargarClases();
  }
  async cargarDocentes()
  {
    this.usuarios = await this.usuarioService.obtenerDocentes(this.KEY_USUARIOS);
  }

  async cargarClases(){
    this.clases = await this.usuarioService.obtenerClases(this.KEY_CLASES);
  }
  async crearClase(){
  var respuesta: boolean = await this.usuarioService.agregarClase(this.KEY_CLASES, this.clase.value);
  if (respuesta) {
    alert('clase creada!');
    await this.cargarClases();
    await this.cargarDocentes();
  } else {
    /* console.log(respuesta) */
    alert('clase ya existe!');
  }
  }
}

