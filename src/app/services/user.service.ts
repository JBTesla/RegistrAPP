import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //variables necesarias para el trabajo del CRUD:
  users: any[] = [{
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
  }];
  user: any;
  isAuthenticated = new BehaviorSubject(false);

  constructor(private router:Router,private storage: Storage) {
    storage.create();
   }

  //métodos del CRUD:
  async recuperarPass(key, user){
    this.users = await this.storage.get(key) || [];
    if ( this.obtenerUsuario(key, user.rut) == undefined ) {
      return true;
    }
    return false;
  }
  async agregarUsuario(key, user){
      this.users = await this.storage.get(key) || [];

      this.user = await this.obtenerUsuario(key, user.rut);
      if(this.user == undefined){
        this.users.push(user);
        await this.storage.set(key, this.users)
        return true;
      }
      return false;
  
  }
  async obtenerUsuario(key, id)
  {
    this.users = await this.storage.get(key) || [];
    this.user = this.users.find(user => user.rut == id);
    return this.user;
  }

  async obtenerUsuarios(key): Promise<any[]> {
    this.users = await this.storage.get(key);
    return this.users;
  }

  async eliminarUsuario(key, user){
    this.users = await this.storage.get(key) || [];
    //if(this.usuarios.length == 0){
      //return
    //}
    this.users.forEach((value, index) => {
      if (value.rut == user) {
        this.users.slice(index, 1);
      }
    });
    await this.storage.set(key, this.users);
  }

  async modificarUsuario(key, dato){
    this.users = await this.storage.get(key) || [];
    var index =await this.users.findIndex(user => user.rut == dato.rut);
    this.users[index] = dato;

    await this.storage.set(key,this.users);
  }

  //MÉTODO CUSTOMER:
  //validar rut y contraseña: método que recibe rut y password y me entrega un JSON de un usuario
  validarRutPassword(rut, pass){
    return this.users.find(u => u.rut == rut && u.password == pass);
  }
  //métodos customer:
  loginUsuario(email, password) {
    var usuarioLogin: any;
    usuarioLogin = this.users.find(user => user.email == email && user.password == password);
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
        return this.users.find(usu => usu.correo == correo);
      }
  cantidadUsuarios(): number{
    return this.users.length;
  }

}
