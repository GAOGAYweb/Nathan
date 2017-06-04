import {Component, ViewChild} from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

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

import {ChatPage} from '../pages/chatlist/chat/chat';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{ title: string, component: any }>;
  accountData=null;
  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public userService:UserService) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      {title: 'My Account', component: AccountIonicPage},
      {title: 'My Map', component: MapPage},
      {title: 'My Friends', component: FriendsPage},
      {title: 'Chats', component: ChatListPage},
      {title: 'WebCraft', component: MinecraftPage},
      {title: 'Moments', component: TabsPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  setAccountData(data) {
    this.accountData = data;
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.accountData = this.userService.getSessionAccountData();
    if (this.accountData) {
      this.nav.setRoot(page.component, this.accountData);
    }
    else {
      alert("wrong account data!")
    }
  }
}
