import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.page.html',
  styleUrls: ['./forget-pass.page.scss'],
})
export class ForgetPassPage implements OnInit {

  email: string;

  constructor(private toastController: ToastController, private router:Router,private usuarioService: UserService) { }

  ngOnInit() {
  }

recuperar(){
  //var usuarioLogin=
}
}
