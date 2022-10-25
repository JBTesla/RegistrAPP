import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  rut:string='';
  usuario: any = {};
  usuarios:any [] =[];
  KEY_USUARIOS = 'usuarios';

  clase: any = {};
  clases:any [] =[];
  KEY_CLASES = 'clases';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {}

  async ngOnInit() {
  this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
  this.clase = await this.userService.obtenerClaseDocente(this.KEY_CLASES, this.rut);
  this.usuario = await this.userService.obtenerUsuario(this.KEY_USUARIOS, this.rut);
  }

}
