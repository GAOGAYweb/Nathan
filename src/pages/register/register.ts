import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

	registerForm: FormGroup;
  constructor(
  	public loadingCtrl: LoadingController,
  	public navCtrl: NavController, public formBuilder: FormBuilder,
  ) {
    this.registerForm = formBuilder.group({
      'username': [
        '', // default value
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      'email': [
      	'',
      	Validators.compose([Validators.required])
      ],
      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      'confirm': [
      	'',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
