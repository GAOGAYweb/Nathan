import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  name:string;
  avatar:string;
  messages;
  myMessage:string;
  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.name=this.navParams.get("name");
    this.avatar=this.navParams.get("avatar");
    this.messages=MESSAGE;
    for(let message of this.messages){
        if(message.tome)
            message.avatar=this.avatar;
        else
            message.avatar="avatar-finn.png";
    }
  }

  send(){
      this.messages.push({
        "tome":false,
        "message":this.myMessage,
        "avatar":"avatar-finn.png"
      });
      this.myMessage="";
  }

}


let MESSAGE = [
    {
        "tome":true,
        "message":"hello",
        "avator":""
    },
    {
        "tome":false,
        "message":"hello",
        "avator":""
    },
    {
        "tome":false,
        "message":"how are you",
        "avator":""
    },
    {
        "tome":true,
        "message":"zaima",
        "avator":""
    },
    {
        "tome":false,
        "message":"buzai",
        "avator":""
    },
    {
        "tome":true,
        "message":"rua",
        "avator":""
    }
];