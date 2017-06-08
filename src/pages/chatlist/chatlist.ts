import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {ChatPage} from './chat/chat';
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core'; 
import { ChatService } from '../../services/ChatService';

declare let JMessage:any;
@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html'
})
export class ChatListPage {

  contacts=[];
  JIM;
  accountData:{id:string, account:string};
  constructor(public navCtrl: NavController,private storage: Storage,
              public cd: ChangeDetectorRef, private chatService:ChatService, public navParams: NavParams) {
    if (!this.accountData) {
      this.accountData = navParams.data;
    }
    console.log(this.accountData);
  }

  ionViewWillEnter(){
    let that=this;
    this.storage.ready().then(()=>{
      this.storage.get('chatlist').then((chatlist)=>{
        if(chatlist){
          for(let i=0;i<chatlist.length;i++){
            this.contacts.push({
              name:chatlist[i].name,
              message: chatlist[i].whatsup, 
              time : chatlist[i].time,
              avatar: chatlist[i].avatar,
              number: 0
            });
          }
          this.cd.detectChanges();  
        }
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
                    'username' : that.accountData.account,
                    'password' : '123456'
                }).onSuccess(function(data) {
                    console.log('success:' + JSON.stringify(data));
                    
                    JIM.onMsgReceive(function(data) {
                        let time="";
                        let date=new Date();
                        if(date.getMinutes()<10){
                            time=date.getHours()+":0"+date.getMinutes();
                        }
                        else
                            time=date.getHours()+":"+date.getMinutes();
                        data.messages.forEach((message)=>{
                            let judge=false;
                            for(let i=0;i<that.contacts.length;i++){
                                if(that.contacts[i].name===message.content.from_id){
                                    that.contacts[i].number++;
                                    that.contacts[i].time=time;
                                    judge=true;
                                    break;
                                }
                            }
                            if(!judge){
                                that.contacts.unshift({
                                    name:message.content.from_id,
                                    number:1
                                });
                                that.storage.ready().then(()=>{
                                  that.storage.get("chatlist").then((chatlist)=>{
                                      chatlist.unshift({
                                          name:message.content.from_id,
                                          number:1,
                                          time:time
                                      });
                                      that.storage.set("chatlist",chatlist);
                                  });
                                });
                            }else{
                                that.storage.set("chatlist",that.contacts);
                            }
                        });
                        that.cd.detectChanges();  
                    });
                    
                    JIM.onSyncConversation(function(data) { //离线消息同步监听
                        console.log(data);
                        let time="";
                        let date=new Date();
                        if(date.getMinutes()<10){
                            time=date.getHours()+":0"+date.getMinutes();
                        }
                        else
                            time=date.getHours()+":"+date.getMinutes();
                        data.forEach(msg=>{
                            console.log(msg);
                            msg.msgs.forEach(message=>{
                                let judge=false;
                                console.log(message);
                                console.log(message.content.from_id);
                                for(let i=0;i<that.contacts.length;i++){
                                    if(that.contacts[i].name===message.content.from_id){
                                        that.contacts[i].number++;
                                        that.contacts[i].time=time;
                                        judge=true;
                                        break;
                                    }
                                }
                                if(!judge&&message.content.from_id!==that.accountData.account){
                                    that.contacts.unshift({
                                        name:message.content.from_id,
                                        number:1
                                    });
                                    that.storage.ready().then(()=>{
                                        that.storage.get("chatlist").then((chatlist)=>{
                                            chatlist.unshift({
                                                name:message.content.from_id,
                                                number:1,
                                                time:time
                                            });
                                            that.storage.set("chatlist",chatlist);
                                        });
                                    });
                                }else{
                                    that.storage.set("chatlist",that.contacts);
                                }
                            });
                        });
                        that.cd.detectChanges(); 
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
      });
    });
    
  }

  ionViewDidLeave(){
    this.contacts=[];
    //this.JIM.loginOut();
  }

  itemTapped(event,friend,avatar) {
    this.storage.ready().then(()=>{
      this.storage.get('chatlist').then((chatlist)=>{
        if(chatlist){
          for(let i=0;i<chatlist.length;i++){
            if(chatlist[i].name===friend){
              chatlist[i].number=0;
              break;
            }
          }
          this.storage.set('chatlist',chatlist);
        }
      });
    })
    this.navCtrl.push(ChatPage,{
        avatar:avatar,
        name:friend
    });
  }

  delete(name){
    this.storage.ready().then(()=>{
      this.storage.get('chatlist').then((chatlist)=>{
        if(chatlist){
          for(let i=0;i<chatlist.length;i++){
            if(chatlist[i].name===name){
              chatlist.splice(i,1);
              break;
            }
          }
          this.storage.set('chatlist',chatlist);
          this.contacts=[];
          for(let i=0;i<chatlist.length;i++){
            this.contacts.push({
              name:chatlist[i].name,
              message: chatlist[i].whatsup, 
              time : chatlist[i].time,
              avatar: chatlist[i].avatar,
              number: chatlist[i].number
            });
          }
          this.cd.detectChanges();  
          console.log(chatlist);
        }
      });
    });
  }
}