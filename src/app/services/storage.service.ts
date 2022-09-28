import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //variables a utilizar

  datos: any[]=[];
  dato: any;
  constructor( private storage: Storage) { 
    storage.create();
  }

  //metododos crud storage
  agregar(){

  }

  getDato(){

  }

  async getDatos(key){
    this.datos = await this.storage.get(key);
    return this.datos;

  }

  eliminar(){

  }

  actualizar(){

  }
}