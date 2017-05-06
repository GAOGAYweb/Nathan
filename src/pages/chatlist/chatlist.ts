import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatPage} from './chat/chat'

@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html'
})
export class ChatListPage {

  contacts;
  constructor(public navCtrl: NavController) {
    this.contacts=CONTACTS;
  }

  itemTapped(event,friend,avatar) {
    this.navCtrl.push(ChatPage,{
        avatar:avatar,
        name:friend
    });
  }

}

let CONTACTS = [
  {"name": "yoda", 
   "message": "gooluuuuuu", 
   "time" : "9:30 am",
   "avatar": "avatar-yoda.png"},
  {"name": "han", 
   "message": "wow", 
   "time" : "12:26 pm",
   "avatar": "avatar-han.png"},
  {"name": "rey", 
   "message": "hello", 
   "time" : "4:45 pm",
   "avatar": "avatar-rey.png"},
]