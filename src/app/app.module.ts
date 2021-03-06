import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, NavController} from 'ionic-angular';
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
import {TabsPage} from '../pages/moments/tabs';
import {LikesPage} from '../pages/moments/likes';
import {RecommendPage} from '../pages/moments/recommend';
import {FriendsDetailPage} from '../pages/friends/friendsDetail/friendsDetail';
import {GroupPage} from '../pages/group/group';
import {ChangeGroupPage} from '../pages/friends/friendsDetail/group';
import { MoviePage } from '../pages/movie/movie';
import { MovieDetailPage } from '../pages/movie/movieDetail/movieDetail';
import { PostCommentPage } from "../pages/movie/movieDetail/postComment";
import { PostArticlePage } from "../pages/movie/movieDetail/postArticle";
import { ArticlePage } from "../pages/movie/movieDetail/article";

import {Keyboard} from '@ionic-native/keyboard';
import {UserService} from "../services/UserService";
import {HttpModule} from "@angular/http";
import {MomentsService} from "../services/MomentsService";
import {ChatService} from "../services/ChatService";
import {FriendList} from "../pages/moments/friendList";
import {LocationList} from "../pages/moments/LocationList";
import {ShareDetail} from "../pages/moments/shareDetail";
import {MinecraftPage} from "../minecraft/minecraft";
import {BrowserPopoverPage} from "../minecraft/browser-popover";
import { IonicStorageModule } from '@ionic/storage';
import {CommentsService} from "../services/CommentsService";
import {FriendService} from "../services/FriendService";
import {MovieService} from "../services/MovieService";

@NgModule({
  declarations: [
    MyApp,
    ProfileIonicPage,
    GenderIonicPage,
    PicIonicPage,
    WhatsUpPage,
    AccountIonicPage,
    MoviePage,
    MapPage,
    MovieDetailPage, PostCommentPage, PostArticlePage, ArticlePage,
    FriendsPage, FriendList, LocationList, ShareDetail,
    MomentsPage, ModalNewPostPage, ModalMomentDetailPage,
    MinecraftPage,BrowserPopoverPage,
    ChatListPage, ChatPage,
    LoginPage, RegisterPage,
    TabsPage,LikesPage,
    RecommendPage,FriendsDetailPage,GroupPage,ChangeGroupPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfileIonicPage,
    GenderIonicPage,
    WhatsUpPage,
    PicIonicPage,
    AccountIonicPage,
    MoviePage,
    MapPage,
    MovieDetailPage, PostCommentPage, PostArticlePage, ArticlePage,
    FriendsPage,FriendList,LocationList, ShareDetail,
    MomentsPage, ModalNewPostPage, ModalMomentDetailPage,
    MinecraftPage,BrowserPopoverPage,
    ChatListPage, ChatPage,
    LoginPage, RegisterPage,
    TabsPage,LikesPage,
    RecommendPage,FriendsDetailPage,GroupPage,ChangeGroupPage
  ],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    NoticeService,
    ImgService,
    UserService,
    FriendService,
    MomentsService,
    CommentsService,
    ChatService,
    MovieService,
    Camera,
    FileChooser,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
