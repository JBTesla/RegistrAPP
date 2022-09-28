import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

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

 //variables validador rut
 esValido: boolean;
 rut: string;

//variables validador fecha nacimiento 
 fec_nac: Date;
 edadMinima: number=17;
 fechaMax: any;
 fechaHoy: any;
 edad: number;

  usuarios: any[] = [];
  verificar_password: string;

  constructor(private usuarioService: UserService,private alertController: AlertController ){

    var timeDiff = Date.now()-(this.edadMinima)*365.25*24*3600*1000;
    var fecha= new Date();
    fecha.setTime(timeDiff);

    this.fechaMax = new DatePipe('en-US').transform(fecha, 'yyyy-MM-dd');
    
    this.fechaHoy = new DatePipe('en-US').transform(Date.now()+1,'yyyy-MM-dd');
  }

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

  calcularEdad() {
    var fn = new Date(this.fec_nac);
    var diferencia_fechas = Math.abs(Date.now() - fn.getTime());
    this.edad = Math.floor((diferencia_fechas / (1000 * 3600 * 24)) / 365.25);
  }
  calcularEdadRetorno() {
    var fn = new Date(this.fec_nac);
    var timeDiff = Math.abs(Date.now() - fn.getTime());
    var edadAlumno = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    if (edadAlumno >= 17) {
      return true;
    } else {
      return false;
    }
  }
  validarRut() {
    var rutSimple= this.rut.replace('.','').replace('.','').replace('-','');
    rutSimple = rutSimple.substring(0, rutSimple.length-1);
    var rutArreglo: any[] = rutSimple.split('').reverse();

    var acumulador: number = 0;
    var multiplo: number = 2;
    for(let digito of rutArreglo){
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if (multiplo>7) {
        multiplo = 2;
      }
    }
    var resto: number = acumulador%11;
    var dvCalculado: any = 11 - resto;
    if (dvCalculado >= 11) {
      dvCalculado = '0';
    }else if(dvCalculado == 10){
      dvCalculado = 'K';
    }
    
    var dvRut: string = this.rut.substring(this.rut.length-1).toUpperCase();
    if (dvRut == dvCalculado.toString()) {
      this.esValido = true;
    }else{
      this.esValido = false;
    }
  }
  

}