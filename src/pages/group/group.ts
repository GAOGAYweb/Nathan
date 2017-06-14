import { Component,ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../../chatlist/chat/chat';
import {UserService} from "../../services/UserService";
import { AlertController } from 'ionic-angular';
import {FriendService} from "../../services/FriendService";

@Component({
  selector: 'group',
  templateUrl: 'group.html'
})
export class GroupPage {
  accountData:{id:string, account:string};
  groups;
  constructor(public navCtrl: NavController,public userService:UserService, public navParams: NavParams,
                public cd: ChangeDetectorRef,public alertCtrl: AlertController,public friendService: FriendService) {
    this.accountData = navParams.data;
    this.userService.getGroup(this.accountData.id).then((data:any)=>{
        this.groups=[];
        let datas=data.data;
        for(let group of datas){
            group=JSON.parse(group);
            this.groups.push({
                groupName:group.groupName,
                friends: group.friends
            });
        }
        this.cd.detectChanges();
    });
  }

  add(){
      let prompt = this.alertCtrl.create({
      title: 'Add',
      message: "Enter a name for this new group",
      inputs: [
        {
          name: 'add',
          placeholder: 'enter a name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            
          }
        },
        {
          text: 'Save',
          handler: data => {
            let judge=false;
            for(let i=0;i<this.groups.length;i++){
                if(data.add===this.groups[i].groupName){
                    judge=true;
                }
            }
            if(judge){
                this.showAlert("Alert","This name has already existed");
            }
            else{
                this.friendService.addGroup(this.accountData.id,data.add);
                this.groups.push({
                    groupName:data.add,
                    friends: ""
                });
            }
          }
        }
      ]
    });
    prompt.present();
  }

  delete(name:string){
    let confirm = this.alertCtrl.create({
      title: 'Delete this group?',
      message: 'Do you agree to delete this group?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {

          }
        },
        {
          text: 'Agree',
          handler: () => {
            for(let i=0;i<this.groups.length;i++){
                if(name===this.groups[i].groupName){
                    if(this.groups[i].friends===""){
                        this.friendService.deleteGroup(this.accountData.id,name);
                        this.groups.splice(i,1);
                    }
                    else
                        this.showAlert("Alert","The group is not empty");
                    break;
                }
            }
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert(title,subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
