import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ValidatorsService } from 'src/app/services/validators.service';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
/* usuario : any =
{
    rut : '',
    email: '',
    nom_completo:'', 
    fecha_nac: '',
    semestre:'',
    password: '',
    tipo_usuario:'' 
} */
  usuario = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc'-'duoc']+(\.cl)$/),Validators.email]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno')
  });

  verificar_password: string;

  usuarios: any[] = [];


  //LLAVE:
  KEY_USUARIOS = 'usuarios';
  constructor(private userService: UserService, private router: Router ,private validators : ValidatorsService,private alertController: AlertController,private loadingCtrl: LoadingController) {
    
   }

  async ngOnInit() {
    await this.cargarUsuarios
  }
  //métodos:
  async cargarUsuarios(){
    this.usuarios = await this.userService.obtenerUsuarios(this.KEY_USUARIOS);
  }
  async registrar() {
    //validación de salida para buscar un rut válido.
    if (!this.validators.validarRut(this.usuario.controls.rut.value)) {
      alert('Rut incorrecto!');
      return;
    }
    //validación de salida para verificar que persona tenga al menos 17 años.
    if (!this.validators.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
      alert('Edad mínima 17 años!');
      return;
    }
    //validación de coincidencia de contraseñas.
    if (this.usuario.controls.password.value != this.verificar_password) {
      alert('Contraseñas no coinciden!');
      return;
    }
    var respuesta: boolean = await this.userService.agregarUsuario(this.KEY_USUARIOS, this.usuario.value);
    if (respuesta) {
      alert('Usuario registrado!');
      /*this.usuario.reset();*/
      this.verificar_password = '';
      this.router.navigate(['/login']);
      /*console.log(respuesta)*/
    } else {
      alert('Usuario ya existe!');
      /*console.log(respuesta)*/
    }
  }
  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }

}

