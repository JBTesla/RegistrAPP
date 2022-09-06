import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

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

  alumno = new FormGroup({
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc'-'duoc']+(\.cl)$/),Validators.email]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('this.tipoUser')
  });


  usuarios: any[] = [];
  verificar_password: string;

  constructor(private usuarioService: UserService,private alertController: AlertController ){}

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //método del formulario
  registrar(){
    if (this.alumno.controls.password.value != this.verificar_password) {
      alert('CONTRASEÑAS NO COINCIDEN!');
      return;
    }
    
    var registrado: boolean = this.usuarioService.agregarUsuario(this.alumno.value);
    if (!registrado) {
      alert('USUARIO YA EXISTE!');
      return;
    }

    alert('ALUMNO REGISTRADO!');
    this.alumno.reset();
    this.verificar_password = '';
  }

  eliminar(rutEliminar){
    this.usuarioService.eliminarUsuario(rutEliminar);
  }

  buscar(rutBuscar){
    var alumnoEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.alumno.setValue(alumnoEncontrado);
    this.verificar_password = alumnoEncontrado.password;
  }

  modificar(){
    //console.log(this.alumno.value);
    this.usuarioService.modificarUsuario(this.alumno.value);
    this.limpiar();
  }

  limpiar(){
    this.alumno.reset();
    this.verificar_password = '';
  }
  

}