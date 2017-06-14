import { Component,ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../../chatlist/chat/chat';
import {UserService} from "../../../services/UserService";
import {FriendService} from "../../../services/FriendService";

@Component({
  selector: 'group',
  templateUrl: 'group.html'
})
export class ChangeGroupPage {
  accountData:{id:string, account:string};
  groups;
  regroup:string;
  id:string;
  constructor(public navCtrl: NavController,public userService:UserService, public navParams: NavParams,
                public cd: ChangeDetectorRef,public friendService:FriendService) {
    this.accountData = navParams.get("account");
    this.regroup = this.navParams.get("group");
    this.id = this.navParams.get("id");
    this.userService.getGroup(this.accountData.id).then((data:any)=>{
        this.groups=[];
        let datas=data.data;
        for(let group of datas){
            group=JSON.parse(group);
            let check=false;
            if(group.groupName===this.regroup)
                check=true;
            this.groups.push({
                groupName:group.groupName,
                friends: group.friends,
                check: check
            });
        }
        console.log(this.groups);
        this.cd.detectChanges();
    });
  }

  changeGroup(groupName){
    this.friendService.move(this.accountData.id,this.id,groupName).then((data)=>{
        
    });
  }

}
