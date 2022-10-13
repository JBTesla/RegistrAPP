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
  usuarios:any[]=[];
  KEY_USUARIOS='usuarios'
  usuarioNavigate:any;
  constructor(private router: Router, private userService: UserService) { }
  administradorDefault: any;
  profesorDefault: any;
  alumnoDefault:any;
  async ngOnInit() {
    this.administradorDefault={
      rut: '11.111.111-1',
      nom_completo: 'Admin',
      email:'ad.min@duoc.cl',
      fecha_nac: '1990-05-01',
      semestre: 1,
      password: 'admin123',
      tipo_usuario: 'administrador'
    };
    this.profesorDefault={
      rut: '11.111.111-3',
      nom_completo: 'Profesor',
      email: 'pr.ofe@profesor.duoc.cl',
      fecha_nac: '1980-06-24',
      semestre: 1,
      password: 'profesor123',
      tipo_usuario: 'profesor'
    };
    this.alumnoDefault={
      rut: '11.111.111-2',
      nom_completo: 'Alumno',
      email: 'al.mno@duocuc.cl',
      fecha_nac: '1999-03-03',
      semestre: 3,
      password: 'alumno123',
      tipo_usuario: 'alumno'
    };
    await this.userService.agregarUsuario(this.KEY_USUARIOS,this.administradorDefault);
    await this.userService.agregarUsuario(this.KEY_USUARIOS,this.profesorDefault);
    await this.userService.agregarUsuario(this.KEY_USUARIOS,this.alumnoDefault);
  }

  //crear nuestro métodos:
  async ingresar() {
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.email.value;
    var claveValidar = this.usuario.controls.password.value;

    /*console.log(correoValidar)*/
    /*console.log(claveValidar)*/

    //rescatamos el usuario con el método login usuario:
    var usuarioLogin = await this.userService.loginUsuario(this.KEY_USUARIOS,correoValidar, claveValidar);
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

