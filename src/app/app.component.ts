import {Component, ViewChild} from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AccountIonicPage} from "../pages/account/account-ionic";
import {MapPage} from "../pages/map/map";
import {FriendsPage} from '../pages/friends/friends';
import {ChatListPage} from '../pages/chatlist/chatlist';
import {MomentsPage} from '../pages/moments/moments';
import {LoginPage} from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public menu: MenuController,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'My Account', component: AccountIonicPage},
      {title: 'My Map', component: MapPage},
      {title: 'My Friends', component: FriendsPage},
      {title: 'Moments', component: MomentsPage},
      {title: 'Chats', component: ChatListPage},
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

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
