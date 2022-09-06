import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RutModule } from 'rut-chileno';
import { InputTrimModule } from 'ng2-trim-directive';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPageRoutingModule,
    ReactiveFormsModule,
    RutModule,
    InputTrimModule,

  ],
  declarations: [RegistrarPage]
})
export class RegistrarPageModule {}
