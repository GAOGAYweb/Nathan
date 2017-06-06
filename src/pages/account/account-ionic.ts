/**
 * Created by Administrator on 2017/4/30.
 */
import { Component } from '@angular/core';
import {ProfileIonicPage} from "./profile/profile-ionic";
import {NavController, NavParams} from "ionic-angular";
import {MomentsPage} from "../moments/moments";
import {FriendsPage} from "../friends/friends";
import {UserService} from "../../services/UserService";
import { ChangeDetectorRef } from '@angular/core';
import {AppConfig} from "../../app/app.config";


@Component({
  selector: 'page-account-ionic',
  templateUrl: 'account-ionic.html'
})
export class AccountIonicPage {
  user: { name: string, description: string, gender: string, friendsNum: number, imageSrc:string};
  mc: {ip: string};
  accountData:{id:string, account:string};
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserService,
              public cd: ChangeDetectorRef) {
    this.mc = {ip: "http://10.131.250.11:3000/multiplayer.html"};
    if (!this.accountData) {
      this.accountData = navParams.data;
    }

    this.user={
      name: "",
        description: "",
        friendsNum: 0,
        gender: "Male",
        imageSrc: "default.jpg"
    };
    userService.getUserInformation(this.accountData.id).then(data => {
      let obj = JSON.parse(data["data"]);
      let name = obj.name;
      let description = obj.description;
      let friendsNum = obj.friendsNum;
      let gender = obj.gender === "0" ? "Male" : "Female";
      let imageSrc = obj.imageSrc;
      this.user = {
        name: name,
        description: description,
        friendsNum: friendsNum,
        gender: gender,
        imageSrc: AppConfig.getImagePrefix() + imageSrc
      };
      this.cd.detectChanges();
    }) ;

  }
  itemTapped(event, user) {
    this.navCtrl.push(ProfileIonicPage, {
      user: user,
      id: this.accountData.id
    });
  }
  intoPost(user) {
    this.navCtrl.push(MomentsPage, {
      accountData: this.accountData,
      visible: "owner"
    });
  }
  intoFriends() {
    this.navCtrl.push(FriendsPage, this.accountData);
  }
  intoMyWorld(user) {
    window.location.href = this.mc.ip;
  }
}
