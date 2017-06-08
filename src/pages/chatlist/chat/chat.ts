import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams,Content } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { ChatService } from '../../../services/ChatService';
import { UserService } from '../../../services/UserService';
import { ChangeDetectorRef } from '@angular/core'; 
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';


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
  account:string;
  user: any;
  constructor(public navCtrl: NavController,public navParams: NavParams,
            private renderer:Renderer, private elementRef:ElementRef,
            private keyboard: Keyboard, private chatService:ChatService,
            public cd: ChangeDetectorRef, private storage:Storage,
            public userService: UserService) {
    this.name=this.navParams.get("name");
    this.avatar=this.navParams.get("avatar");
    this.user=JSON.parse(userService.getSessionUserInformation());
    console.log(this.user);
    this.myMessage="";
    this.storage.ready().then(()=>{
        this.storage.get("user").then((account)=>{
            this.account=account;
            this.chatService.queryChat(this.account,this.name).then((data:any)=>{
                console.log(data.data);
                let MESSAGE=[];
                data.data.forEach((data)=>{
                    MESSAGE.push({
                        "tome":JSON.parse(data).fromName===this.account?false:true,
                        "message":JSON.parse(data).content,
                        "avatar":JSON.parse(data).fromName===this.account?AppConfig.getImagePrefix()+this.user.imageSrc
                        :this.avatar
                    });
                });
                this.messages=MESSAGE;
                this.cd.detectChanges();
            });
        });
    });
  }

  ngOnDestroy(){
      //this.JIM.loginOut();
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
                "flag" : "0"
            }).onSuccess(function(data) {
                console.log('success:' + JSON.stringify(data));
                JIM.login({
                    'username' : that.account,
                    'password' : '123456'
                }).onSuccess(function(data) {
                    console.log('success:' + JSON.stringify(data));
                    
                    JIM.onMsgReceive(function(data) {
                        data.messages.forEach(message => {
                            that.messages.push({
                                "tome":true,
                                "message":message.content.msg_body.text,
                                "avatar":that.avatar
                            });
                        });
                        console.log(data);
                        data = JSON.stringify(data);
                        console.log('msg_receive:' + data);
                        that.cd.detectChanges(); 
                        that.content.scrollToBottom(300);
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
      
      if(this.myMessage===""){
        return;
      }
      let element = this.elementRef.nativeElement.querySelector('input');
       // we need to delay our call in order to work with ionic …
      setTimeout(() => {
        this.renderer.invokeElementMethod(element, 'focus', []);
        this.keyboard.show();
        this.content.scrollToBottom(300);
      }, 500); // with 0 it will trigger a validation error instantly
      
        let temp=this.myMessage;
        this.messages.push({
            "tome":false,
            "message":temp,
            "avatar":AppConfig.getImagePrefix()+this.user.imageSrc
        });
        this.chatService.addChat(this.account,this.name,this.myMessage);
        this.JIM.sendSingleMsg({
            'target_username' : this.name,
            'content' : temp
        }).onSuccess((data) => {
            console.log('success:' + JSON.stringify(data));
            this.myMessage="";
            this.cd.detectChanges(); 
        }).onFail(function(data) {
            console.log('error:' + JSON.stringify(data));
        });
      }

}