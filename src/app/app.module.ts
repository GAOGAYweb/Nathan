import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HelloIonicPage} from '../pages/hello-ionic/hello-ionic';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ListPage} from '../pages/list/list';

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

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ProfileIonicPage,
    GenderIonicPage,
    PicIonicPage,
    WhatsUpPage,
    ListPage,
    AccountIonicPage,
    MapPage,
    FriendsPage,
    MomentsPage, ModalNewPostPage, ModalMomentDetailPage,
    ChatListPage, ChatPage,
    LoginPage, RegisterPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ProfileIonicPage,
    GenderIonicPage,
    WhatsUpPage,
    PicIonicPage,
    ListPage,
    AccountIonicPage,
    MapPage,
    FriendsPage,
    MomentsPage, ModalNewPostPage, ModalMomentDetailPage,
    ChatListPage, ChatPage,
    LoginPage, RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NoticeService,
    ImgService,
    Camera,
    FileChooser,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
