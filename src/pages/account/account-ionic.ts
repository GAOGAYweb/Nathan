/**
 * Created by Administrator on 2017/4/30.
 */
import { Component } from '@angular/core';
import {ProfileIonicPage} from "./profile/profile-ionic";
import {NavController, NavParams, MenuController} from "ionic-angular";
import {MomentsPage} from "../moments/moments";
import {FriendsPage} from "../friends/friends";
import {UserService} from "../../services/UserService";
import { ChangeDetectorRef } from '@angular/core';
import {AppConfig} from "../../app/app.config";
import {LoginPage} from "../login/login";
import { Storage } from '@ionic/storage';
import {MinecraftPage} from "../../minecraft/minecraft";


@Component({
  selector: 'page-account-ionic',
  templateUrl: 'account-ionic.html'
})
export class AccountIonicPage {
  user: { name: string, description: string, gender: string, friendsNum: number, imageSrc:string};
  mc: {ip: string};
  accountData:{id:string, account:string};
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserService,
              public cd: ChangeDetectorRef, public menu: MenuController,private storage:Storage) {
    this.mc = {ip: "http://10.131.250.11:3000/multiplayer.html"};
    if (!this.accountData) {
      this.accountData = navParams.data;
    }
    this.user={
      name: "",
        description: "",
        friendsNum: 0,
        gender: "Male",
        imageSrc: AppConfig.getImagePrefix() + "default.jpg"
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
      id: this.accountData.id,
      accountData: this.accountData
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
    this.navCtrl.push(MinecraftPage, {
      isLoaded: false, // 网页是否被加载
      proObj: null, // 进度条对象
      progress: 0, // 网页访问的进度条
      secUrl: 'http://10.131.250.11:3000/multiplayer.html', // 安全链接

      title: 'loading...',
      url: 'http://10.131.250.11:3000/multiplayer.html',
      share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
    });
  }
  Logout(){
    this.storage.ready().then(()=>{
      this.storage.remove("user");
      this.storage.remove("pwd");
      this.storage.remove("chatlist");
    });
    this.menu.swipeEnable(false, 'myMenu');
    this.navCtrl.setRoot(LoginPage);
  }
}
