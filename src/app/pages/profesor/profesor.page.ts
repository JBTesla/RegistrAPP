import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  //VAMOS A CREAR LAS VARIABLES PARA NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';
  //variables para docentes
  docentes: any[]=[];
  docente: any;
  KEY_DOCENTES= 'docentes'
  //variobles para clases
  clases: any[]=[];
  clase: any;
  KEY_CLASES='clases';

  asistencias:any[]=[];

  asistencia: any;
  KEY_ASISTENCIAS='asistencias'

  contador:any;
  rut: string;
  constructor(private userService:UserService,private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    await this.cargarClase();
    await this.cargarDocentes();
  }

  //método para generar un código unico para el codigo QR:
  async cargarDocentes(){
    this.docentes = await this.userService.obtenerDocente(this.KEY_DOCENTES);
  }
  async cargarClase(){
    this.clases = await this.userService.obtenerClaseDocente(this.KEY_CLASES, this.rut);
  }
  async generarCodigo(cod_clase){
/*     this.clases = await this.userService.obtenerClaseDocente(this.KEY_CLASES, rut); */
    this.contador = await this.userService.idClase(this.KEY_ASISTENCIAS)
    this.asistencia={
      cod_asistencia: this.contador,
      cod_clase: cod_clase,
      alumnos:[]
    }
    console.log(cod_clase)
    console.log(this.contador)
    var respuesta: boolean = await this.userService.agregarAsistencia(this.KEY_ASISTENCIAS, this.asistencia );
    if(respuesta){
      alert('asistencia generada Escamear QR para quedar presente')
      await this.cargarClase();
      await this.cargarDocentes();
      if (this.value == '') {
        this.value = JSON.stringify(this.contador);
      }
      console.log(respuesta)
    }else{
      alert('la asistencia de hoy ya esta creada!')
      console.log(respuesta)
      console.log(this.asistencia)
    }
  }
}
