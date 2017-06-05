import {Component} from '@angular/core';
import {AlertController, ViewController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/UserService";

@Component({
  selector: 'page-momentDetail',
  templateUrl: 'momentDetail.html'
})

export class ModalMomentDetailPage {
  moment;
  accountData:{id:string, account:string};
  accountInformation: { name: string, description: string, gender: string, friendsNum: number, imageSrc:string};
  constructor(public viewCtrl: ViewController, public params: NavParams, public alertCtrl: AlertController, public userService: UserService) {
    this.moment = this.params.get('moment').moment;
    this.accountData = this.params.get("accountData");
    this.accountInformation = JSON.parse(this.userService.getSessionUserInformation());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Comment',
      message: "Enter your comment",
      inputs: [
        {
          name: 'comment-text',
          placeholder: 'Comment'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            let obj = {
              "author": this.accountInformation.name,
              "avatar": this.accountInformation.imageSrc,
              "content": data["comment-text"],
              "time": new Date(Date.now()).toLocaleDateString()
            };
            this.moment.comments.push(obj);
          }
        }
      ]
    });
    prompt.present();
  }
}
