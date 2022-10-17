import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private userService:UserService) { }

  clases:any[]=[];
  clase: any;
  KEY_CLASES = 'clases'

  async ngOnInit() {
    await this.cargarClases;
  }

async cargarClases(){
  this.clases = await this.userService.obtenerClases(this.KEY_CLASES);
}
}
