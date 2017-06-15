import {Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AccountIonicPage} from "../pages/account/account-ionic";
import {MapPage} from "../pages/map/map";
import {FriendsPage} from '../pages/friends/friends';
import {ChatListPage} from '../pages/chatlist/chatlist';
import {LoginPage} from '../pages/login/login';
import {UserService} from "../services/UserService";
import {MinecraftPage} from "../minecraft/minecraft";
import {TabsPage} from '../pages/moments/tabs';
import { Storage } from '@ionic/storage';
import {GroupPage} from '../pages/group/group';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{ title: string, component: any }>;
  accountData:{};
  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public userService:UserService,public storage:Storage,
              public loadingCtrl: LoadingController) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      {title: 'My Account', component: AccountIonicPage},
      {title: 'My Map', component: MapPage},
      {title: 'My Friends', component: FriendsPage},
      {title: 'Chats', component: ChatListPage},
      {title: 'WebCraft', component: MinecraftPage},
      {title: 'Moments', component: TabsPage},
      {title: 'Groups', component: GroupPage}
    ];

  }

  initializeApp() {
    this.storage.ready().then(() => {
      this.storage.get('user').then((user) => {
        if(user){
          this.storage.get('pwd').then((pwd)=>{
            this.autoLogin(user,pwd);
          });
        }
      })
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  autoLogin(user,pwd){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    loader.present();
    //console.log("sign in:", this.account, this.password);
    this.userService.login(user, pwd).then(data => {
      console.log(data);
      if (data["status"] === "200") {
        this.menu.swipeEnable(true, 'myMenu');
        this.nav.setRoot(MapPage, JSON.parse(data["data"]));
        loader.dismiss();
      }
      else {
        this.storage.remove("user");
        this.storage.remove("chatlist");
        loader.dismiss();
      }
    });
  }

  setAccountData(data) {
    this.accountData = JSON.parse(data);
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let _data = this.userService.getSessionAccountData().toString();
    this.accountData = JSON.parse(_data);
    this.nav.setRoot(page.component, this.accountData);
  }
}
