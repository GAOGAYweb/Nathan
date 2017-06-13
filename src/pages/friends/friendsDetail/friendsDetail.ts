import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../../chatlist/chat/chat';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'friendsDetail',
  templateUrl: 'friendsDetail.html'
})
export class FriendsDetailPage {
  accountData:{id:string, account:string};
  avatar:string;
  name:string;
  whatsup:string;
  constructor(public navCtrl: NavController,private storage: Storage, public navParams: NavParams) {
    this.accountData = navParams.get("account");
    this.avatar = this.navParams.get("avatat");
    this.name = this.navParams.get("name");
    this.whatsup = this.navParams.get("whatsup");
  }

  changeGroup(){

  }

  intoChats() {
    let date=new Date();
    let time="";
    if(date.getMinutes()<10){
      time=date.getHours()+":0"+date.getMinutes();
    }
    else
      time=date.getHours()+":"+date.getMinutes();
    this.storage.ready().then(()=>{
      this.storage.get('chatlist').then((chatlist)=>{
        if(chatlist){
          for(let i=0;i<chatlist.length;i++){
            if(chatlist[i].name===this.name){
              chatlist.splice(i,1);
              break;
            }
          }
          chatlist.unshift({name:this.name,avatar:this.avatar,whatsup:this.whatsup,time:time,number:0});
          this.storage.set('chatlist',chatlist);
          console.log(chatlist);
        }
        else{
          this.storage.set('chatlist',
            [{name : this.name,avatar:this.avatar,whatsup:this.whatsup,time:time,number:0}]
          );
        }
      });
    });
    this.navCtrl.push(ChatPage,{
        avatar:this.avatar,
        name:this.name
    });
  }

}
