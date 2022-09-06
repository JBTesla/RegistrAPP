import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //vamos a crear las variables necesarias:
  user: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, 
    private usuarioService: UserService) { }

  ngOnInit() {
  }

  //método para ingresar a home:
  login(){
    var usuarioLogin = this.usuarioService.validarRutPassword(this.user, this.password);

    if (usuarioLogin != undefined) {
      if (usuarioLogin.tipo_usuario == 'administrador') {
        this.router.navigate(['/administrador']);
      }else if(usuarioLogin.tipo_usuario == 'profesor'){
        this.router.navigate(['/profesor']);
      }else{
        this.router.navigate(['/alumno']);
      }
    }else{
      this.tostadaError();
    }
  }

  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos!!!',
      duration: 3000
    });
    toast.present();
  }




}
