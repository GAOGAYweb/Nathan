import { Component } from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from 'ionic-angular';
import {MapPage} from "../map/map";
import {UserService} from "../../services/UserService";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account:string;
  password:string;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public menu: MenuController,
              public userService:UserService, private alertCtrl: AlertController, private storage:Storage) {
    this.menu.swipeEnable(false, 'myMenu');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    //console.log("sign in:", this.account, this.password);
    this.userService.login(this.account, this.password).then(data => {
      console.log(data);
      if (data["status"] === "200") {
        this.storage.ready().then(()=>{
          this.storage.get("user").then((user)=>{
            if(user){
              if(user===this.account){

              }
              else{
                this.storage.set("user",this.account);
                this.storage.remove("chatlist");
              }
            }
            else{
              this.storage.set("user",this.account);
            }
          });
        });
        this.menu.swipeEnable(true, 'myMenu');
        this.navCtrl.setRoot(MapPage, JSON.parse(data["data"]));

        loader.dismiss();
      }
      else {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Wrong Input',
          subTitle: 'You might input a wrong account or password!',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }
}
