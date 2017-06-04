import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AccountIonicPage} from "../pages/account/account-ionic";
import {MapPage} from "../pages/map/map";
import {ProfileIonicPage} from "../pages/account/profile/profile-ionic";
import {GenderIonicPage} from "../pages/account/profile/profile-detail/gender-ionic";
import {WhatsUpPage} from "../pages/account/profile/profile-detail/whatsup-ionic";
import {PicIonicPage} from "../pages/account/profile/profile-detail/pic-ionic";
import {NoticeService} from "../pages/account/profile/profile-detail/notice-service";
import {ImgService} from "../pages/account/profile/profile-detail/image-service";
import {Camera} from "@ionic-native/camera";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {ChatListPage} from '../pages/chatlist/chatlist';
import {ChatPage} from '../pages/chatlist/chat/chat';
import {FriendsPage} from '../pages/friends/friends';
import {MomentsPage} from '../pages/moments/moments';
import {ModalNewPostPage} from '../pages/moments/newPost';
import {ModalMomentDetailPage} from '../pages/moments/momentDetail';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';

import {Keyboard} from '@ionic-native/keyboard';
import {UserService} from "../services/UserService";
import {HttpModule} from "@angular/http";
import {MomentsService} from "../services/MomentsService";
import {ChatService} from "../services/ChatService";
import {FriendList} from "../pages/moments/friendList";
import {LocationList} from "../pages/moments/LocationList";

@NgModule({
  declarations: [
    MyApp,
    ProfileIonicPage,
    GenderIonicPage,
    PicIonicPage,
    WhatsUpPage,
    AccountIonicPage,
    MapPage,
    FriendsPage, FriendList, LocationList,
    MomentsPage, ModalNewPostPage, ModalMomentDetailPage,
    ChatListPage, ChatPage,
    LoginPage, RegisterPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfileIonicPage,
    GenderIonicPage,
    WhatsUpPage,
    PicIonicPage,
    AccountIonicPage,
    MapPage,
    FriendsPage,FriendList,LocationList,
    MomentsPage, ModalNewPostPage, ModalMomentDetailPage,
    ChatListPage, ChatPage,
    LoginPage, RegisterPage
  ],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    NoticeService,
    ImgService,
    UserService,
    MomentsService,
    ChatService,
    Camera,
    FileChooser,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
