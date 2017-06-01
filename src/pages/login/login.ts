import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {MapPage} from "../map/map";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController) {

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    setTimeout(()=> {
      this.navCtrl.push(MapPage);
    },1000);
  }
}
