import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams,Content } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild(Content) content: Content

  name:string;
  avatar:string;
  messages;
  myMessage:string;
  constructor(public navCtrl: NavController,public navParams: NavParams,private renderer:Renderer, private elementRef:ElementRef,private keyboard: Keyboard) {
    this.name=this.navParams.get("name");
    this.avatar=this.navParams.get("avatar");
    this.messages=MESSAGE;
    this.myMessage="";
    for(let message of this.messages){
        if(message.tome)
            message.avatar=this.avatar;
        else
            message.avatar="avatar-finn.png";
    }
  }

  send(){
      let element = this.elementRef.nativeElement.querySelector('input');
       // we need to delay our call in order to work with ionic …
      setTimeout(() => {
        this.renderer.invokeElementMethod(element, 'focus', []);
        this.keyboard.show();
        this.content.scrollToBottom(300);
      }, 500); // with 0 it will trigger a validation error instantly
      if(this.myMessage==""){

      }
      else{
        this.messages.push({
            "tome":false,
            "message":this.myMessage,
            "avatar":"avatar-finn.png"
        });
        this.myMessage="";
      }
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