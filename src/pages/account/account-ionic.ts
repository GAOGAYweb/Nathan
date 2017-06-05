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
    this.user={name: "name",
        description: "description",
        friendsNum: 123,
        gender: "gender",
        imageSrc: "imageSrc"};
    userService.getUserInformation(this.accountData.id).then(data => {
      console.log(data);
      let obj = JSON.parse(data["data"]);
      let name = obj.name;
      let description = obj.description;
      let friendsNum = obj.friendsNum;
      let gender = obj.gender;
      let imageSrc = obj.imageSrc;
      console.log("data", name, description, friendsNum, gender, imageSrc);
      this.user = {
        name: name,
        description: description,
        friendsNum: friendsNum,
        gender: gender,
        imageSrc: imageSrc
      }
      console.log(this.user);
      this.cd.detectChanges();  
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
