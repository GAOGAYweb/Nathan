import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatPage} from './chat/chat';
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core'; 

@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html'
})
export class ChatListPage {

  contacts=[];
  constructor(public navCtrl: NavController,private storage: Storage,public cd: ChangeDetectorRef) {
    
  }

  ionViewWillEnter(){
    this.storage.ready().then(()=>{
      this.storage.get('chatlist').then((chatlist)=>{
        if(chatlist){
          for(let i=0;i<chatlist.length;i++){
            this.contacts.push({
              name:chatlist[i].name,
              message: "gooluuuuuu", 
              time : "9:30 am",
              avatar: chatlist[i].avatar
            });
          }
          this.cd.detectChanges();  
        }
      });
    });
  }

  ionViewDidLeave(){
    this.contacts=[];
  }

  itemTapped(event,friend,avatar) {
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
              message: "gooluuuuuu", 
              time : "9:30 am",
              avatar: chatlist[i].avatar
            });
          }
          this.cd.detectChanges();  
          console.log(chatlist);
        }
      });
    });
  }
}