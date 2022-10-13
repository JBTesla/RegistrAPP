import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //variables de usuario que recibirá los datos que vienen desde login:
  usuarios: any[]=[]
  usuario: any;
  cantidad: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(){
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    console.log(this.usuario)
    this.cantidad = this.userService.cantidadUsuarios();
  }

  //método para logout:
  logout(){
    this.userService.logout();
  }

}