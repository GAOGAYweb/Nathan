import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams,Content } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ChatService } from '../../../services/ChatService';
import { ChangeDetectorRef } from '@angular/core'; 


declare let JMessage:any;
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
  JIM;
  constructor(public navCtrl: NavController,public navParams: NavParams,
            private renderer:Renderer, private elementRef:ElementRef,
            private keyboard: Keyboard, private chatService:ChatService,
            public cd: ChangeDetectorRef) {
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

  ngOnInit(){
      let that=this;
      this.chatService.init().then((data:any)=>{
        console.log(data);
        let JIM=new JMessage();
        this.JIM=JIM;
        JIM.init({
                "appkey" : data.appkey,
                "random_str" : data.random_str,
                "signature" : data.signature,
                "timestamp" : data.timestamp,
                "flag" : "1"
            }).onSuccess(function(data) {
                console.log('success:' + JSON.stringify(data));
                JIM.login({
                    'username' : 'test',
                    'password' : '123456'
                }).onSuccess(function(data) {
                    console.log('success:' + JSON.stringify(data));
                    JIM.onMsgReceive(function(data) {
                        data.messages.forEach(message => {
                            that.messages.push({
                                "tome":true,
                                "message":message.content.msg_body.text,
                                "avatar":"avatar.png"
                            });
                        });
                        console.log(data);
                        data = JSON.stringify(data);
                        console.log('msg_receive:' + data);
                        
                    });
                    
                    JIM.onSyncConversation(function(data) { //离线消息同步监听
                        console.log(data);
                        data.forEach(msg=>{
                            console.log(msg);
                            msg.msgs.forEach(message=>{
                                console.log(message);
                                console.log(message.content.from_id);
                                that.messages.push({
                                    "tome":true,
                                    "message":message.content.msg_body.text,
                                    "avatar":"avatar.png"
                                });
                            });
                        });
                        that.cd.detectChanges(); 
                        console.log('event_receive: ' + JSON.stringify(data));
                    });
                }).onFail(function(data) {
                    console.log('error:' + JSON.stringify(data));
                }).onTimeout(function(data) {
                    console.log('timeout:' + JSON.stringify(data));
                });
            }).onFail(function(data) {
                // 同
            });
        });
      
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
        this.JIM.sendSingleMsg({
            'target_username' : 'test2',
            'content' : this.myMessage
        }).onSuccess(function(data) {
            console.log('success:' + JSON.stringify(data));
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data));
        });
        this.myMessage="";
      }
  }

}


let MESSAGE = [
    
];