import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private userService:UserService,private activatedRoute: ActivatedRoute) { }
  rut: string;
  clases:any[]=[];
  clase: any;
  KEY_CLASES = 'clases'

  asistencias:any[]=[];
  asisntencia:any;
  KEY_ASISTENCIAS = 'asistencias'

  Qrcode: any;

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    await this.cargarClases();
    await this.cargarAsistencias();
  }

async cargarClases(){
  this.clases = await this.userService.obtenerClases(this.KEY_CLASES);
}

async cargarAsistencias(){
  this.asistencias = await this.userService.obtenerAsistencias(this.KEY_ASISTENCIAS);
}

async ingresarAsistencia(){
  //console.log(this.rut): verificar el rut
    await this.userService.ingresarAsistencia(this.KEY_ASISTENCIAS, this.Qrcode,this.rut);
}

}
