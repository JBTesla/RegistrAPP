import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.page.html',
  styleUrls: ['./forget-pass.page.scss'],
})
export class ForgetPassPage implements OnInit {
  usuarios: any[] = [];
  email: string;

  constructor(private toastController: ToastController, private router:Router,private usuarioService: UserService) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

recuperarPass(){
  var validarEmail= this.usuarioService.validarCorreo(this.email)
 if (validarEmail != undefined) {
  if (validarEmail.email == this.email) {
    alert('Se ah enviado un correo electronico de recuperacion');
  }
 }else{
  this.tostadaError();
 }
}
  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Correo no registrado',
      duration: 3000
    });
    toast.present();
  }
}
