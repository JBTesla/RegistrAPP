import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //variables necesarias para el trabajo del CRUD:
  usuarios: any[] = [
    {
      rut: '11.111.111-1',
      nom_completo: 'Admin',
      email:'ad.min@duoc.cl',
      fecha_nac: '1990-05-01',
      semestre: 1,
      password: 'admin123',
      tipo_usuario: 'administrador'
    },
    {
      rut: '11.111.111-2',
      nom_completo: 'Alumno',
      email: 'al.mno@duocuc.cl',
      fecha_nac: '1999-03-03',
      semestre: 3,
      password: 'alumno123',
      tipo_usuario: 'alumno'
    },
    {
      rut: '11.111.111-3',
      nom_completo: 'Profesor',
      email: 'pr.ofe@profesor.duoc.cl',
      fecha_nac: '1980-06-24',
      semestre: 1,
      password: 'profesor123',
      tipo_usuario: 'profesor'
    }
  ];
  isAuthenticated = new BehaviorSubject(false);

  constructor(private router:Router) { }

  //métodos del CRUD:
  recuperarPass(usuario): boolean{
    if ( this.obtenerUsuario(usuario.email) == undefined ) {
      return true;
    }
    return false;
  }
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.rut) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }
  eliminarUsuario(rut){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  modificarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(rut){
    return this.usuarios.find(usuario => usuario.rut == rut);
  }
  obtenerUsuarios(){
    return this.usuarios;
  }

  //MÉTODO CUSTOMER:
  //validar rut y contraseña: método que recibe rut y password y me entrega un JSON de un usuario
  validarRutPassword(rut, pass){
    return this.usuarios.find(u => u.rut == rut && u.password == pass);
  }
  //métodos customer:
  loginUsuario(email, password) {
    var usuarioLogin: any;
    usuarioLogin = this.usuarios.find(usu => usu.email == email && usu.password == password);
    if (usuarioLogin != undefined) {
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
      }
      getAuth(){
        return this.isAuthenticated.value;
      }
      logout(){
        this.isAuthenticated.next(false);
        this.router.navigate(['/login']);
      }

      validarCorreo(correo){
        return this.usuarios.find(usu => usu.correo == correo);
      }


}
