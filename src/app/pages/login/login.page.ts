import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables:
  usuario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

  }

  //crear nuestro métodos:
  ingresar() {
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.email.value;
    var claveValidar = this.usuario.controls.password.value;

    //rescatamos el usuario con el método login usuario:
    var usuarioLogin = this.userService.loginUsuario(correoValidar, claveValidar);
    //validamos si existe el usuario
    if (usuarioLogin != undefined) {
      //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };

      //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
      this.router.navigate(['/home'], navigationExtras);

    } else {
      alert('Usuario o contraseña incorrectos!')
    }
  }

}

