/**
 * Created by Administrator on 2017/4/30.
 */
import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from "ionic-angular";
import {GenderIonicPage} from "./profile-detail/gender-ionic";
import {WhatsUpPage} from "./profile-detail/whatsup-ionic";
import {PicIonicPage} from "./profile-detail/pic-ionic";


@Component({
  selector: 'page-profile-ionic',
  templateUrl: 'profile-ionic.html',
})
export class ProfileIonicPage {
  myCallbackFunction: (_params: any) => Promise<{}>;
  selectedUser: { name: string; description: string; gender: string; friendsNum: number; imageSrc: string};
  pics:any;
  id:string;
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.selectedUser = navParams.get('user');
    this.id = navParams.get('id');
    this.myCallbackFunction = function(_params) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }
  genderTapped(event, isGender, value) {
    console.log(isGender);
    if (isGender === 0) {
      let modal = this.modalCtrl.create(GenderIonicPage, {gender: value, id: this.id});
      modal.onDidDismiss(data => {
        this.selectedUser.gender = data["gender"];
      });
      modal.present();
    }
    else if(isGender === 1) {
      new Promise((resolve, reject) => {
        this.navCtrl.push(WhatsUpPage, {resolve: resolve, description: value, id: this.id});
      }).then(data => {
        this.selectedUser.description = data.toString();
      });
    }
    else {
      new Promise((resolve, reject) => {
        this.navCtrl.push(PicIonicPage, {resolve: resolve, imageSrc: value, id: this.id});
      }).then(data => {
        //let des = this.selectedUser.description = data.toString();
      });
    }
  }
}
