import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { ValidatorsService } from 'src/app/services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {


  tipoUser: any[]=[{
    tipo_usu:'alumno'
  },
  {
    tipo_usu:'profesor'
  },
  {
    tipo_usu:'administrador'
  }];

  usuario: any = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc'-'duoc']+(\.cl)$/),Validators.email]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('this.tipoUser')
  });
  verificar_password: string;
  
  usuarios: any[] = [];
  KEY_USUARIOS = 'usuarios';

  constructor(private usuarioService: UserService,private alertController: AlertController, private loadingCtrl: LoadingController, private validators:ValidatorsService, private router:Router ){
  }

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  //método del formulario
async cargarUsuarios(){
  this.usuarios = await this.usuarioService.obtenerUsuarios(this.KEY_USUARIOS);
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
  var respuesta: boolean = await this.usuarioService.agregarUsuario(this.KEY_USUARIOS, this.usuario);
  if (respuesta) {
    alert('Usuario registrado!');
    this.usuario.reset();
    this.verificar_password = '';
    await this.cargarUsuarios();
  } else {
    alert('Usuario ya existe!');
  }
}

  async eliminar(rut){
    await this.usuarioService.eliminarUsuario(this.KEY_USUARIOS, rut);
    await this.cargando('actualizando usuarios...');
    await this.cargarUsuarios();
  }

  async buscar(rut){
    var usuarioEncontrado = await this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, rut);
    this.usuario.setValue(usuarioEncontrado);
  }

  async modificar(){
    //console.log(this.alumno.value);
    this.usuarioService.modificarUsuario(this.KEY_USUARIOS, this.usuario);
    this.cargando('actualizando usuarios....')
    this.limpiar();
  }

  limpiar(){
    this.usuario.reset();
    this.verificar_password = '';
  }
  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }

}