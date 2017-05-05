/**
 * Created by Administrator on 2017/4/30.
 */
import { Component } from '@angular/core';
import {ProfileIonicPage} from "./profile/profile-ionic";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'page-account-ionic',
  templateUrl: 'account-ionic.html'
})
export class AccountIonicPage {
  user: { name: string; description: string; gender: string; friendsNum: number; imageSrc: string};
  mc: {ip: string};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mc = {ip: "http://10.131.250.11:3000/multiplayer.html"};
    this.user = {
      name: "Ultra-Seven",
      description: "Back off, man. I'm a scientist.",
      gender: "Male",
      friendsNum: 0,
      imageSrc: "http://www.runoob.com/try/demo_source/venkman.jpg",
    }
  }
  itemTapped(event, user) {
    this.navCtrl.push(ProfileIonicPage, {
      user: user
    });
  }
  intoMyWorld(user) {
    window.location.href = this.mc.ip;
  }
}
