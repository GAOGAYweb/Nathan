/**
 * Created by Administrator on 2017/4/30.
 */
import { Component } from '@angular/core';
import {ProfileIonicPage} from "./profile/profile-ionic";
import {NavController, NavParams} from "ionic-angular";
import {MomentsPage} from "../moments/moments";
import {FriendsPage} from "../friends/friends";
import {UserService} from "../../services/UserService";


@Component({
  selector: 'page-account-ionic',
  templateUrl: 'account-ionic.html'
})
export class AccountIonicPage {
  user: { name: string; description: string; gender: string; friendsNum: number; imageSrc: string};
  mc: {ip: string};
  accountData:{id:string, account:string};
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserService) {
    this.mc = {ip: "http://10.131.250.11:3000/multiplayer.html"};
    if (!this.accountData) {
      this.accountData = JSON.parse(navParams.data);
    }
    console.log("accountData", this.accountData);

    userService.getUserInformation(this.accountData.id).then(data => {

      console.log(data.data.gender);
      this.user = data.data;
    }) ;
  }
  itemTapped(event, user) {
    this.navCtrl.push(ProfileIonicPage, {
      user: user
    });
  }
  intoPost(user) {
    this.navCtrl.push(MomentsPage, {
      user: user
    });
  }
  intoFriends() {
    this.navCtrl.setRoot(FriendsPage);
  }
  intoMyWorld(user) {
    window.location.href = this.mc.ip;
  }
}
