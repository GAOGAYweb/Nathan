import {ChangeDetectorRef, Component} from '@angular/core';
import {AlertController, ViewController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/UserService";
import {CommentsService} from "../../services/CommentsService";
import {AppConfig} from "../../app/app.config";

@Component({
  selector: 'page-momentDetail',
  templateUrl: 'momentDetail.html'
})

export class ModalMomentDetailPage {
  moment;
  accountData:{id:string, account:string};
  accountInformation: { name: string, description: string, gender: string, friendsNum: number, imageSrc:string};
  constructor(public viewCtrl: ViewController, public params: NavParams, public alertCtrl: AlertController,
              public userService: UserService, public commentsService: CommentsService, public cd: ChangeDetectorRef
  ) {
    this.moment = this.params.get('moment').moment;
    console.log("moment", this.moment);
    this.accountData = this.params.get("accountData");
    this.accountInformation = JSON.parse(this.userService.getSessionUserInformation());
    if(!this.moment.comments[0]) {
      commentsService.getComments(this.moment.id).then(data => {
        let comments = data["data"];
        for (let comment in comments) {
          let obj = JSON.parse(comments[comment]);
          this.moment.comments.push({
            "author": obj.nickname,
            "avatar": AppConfig.getImagePrefix() + obj.avatar,
            "content": obj.content,
            "time": obj.time
          });
        }
        this.cd.detectChanges();
      });
    }
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
            this.commentsService.addComment(this.moment.id, this.accountData.id, obj.content).then(data => {
              console.log(data);
              if("200" === data["status"]) {
                this.moment.comments.push(obj);
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
