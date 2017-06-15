import {ChangeDetectorRef, Component} from '@angular/core';
import {AlertController, ViewController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/UserService";
import {CommentsService} from "../../services/CommentsService";
import {AppConfig} from "../../app/app.config";
import {MomentsService} from "../../services/MomentsService";

@Component({
  selector: 'page-momentDetail',
  templateUrl: 'momentDetail.html'
})

export class ModalMomentDetailPage {
  moment;
  accountData:{id:string, account:string};
  accountInformation: { name: string, description: string, gender: string, friendsNum: number, imageSrc:string};
  constructor(public viewCtrl: ViewController, public params: NavParams, public alertCtrl: AlertController,
              public momentsService: MomentsService,
              public userService: UserService, public commentsService: CommentsService, public cd: ChangeDetectorRef
  ) {
    this.moment = this.params.get("moment");
    this.accountData = this.params.get("accountData");
    console.log("moments", this.moment);
    this.accountInformation = JSON.parse(this.userService.getSessionUserInformation());
    if(this.moment.commentsSize > 0) {
      this.moment.comments = [];
      commentsService.getComments(this.moment.id).then(data => {
        let comments = data["data"];
        console.log("comments", comments);
        for (let comment in comments) {
          let obj = JSON.parse(comments[comment]);
          this.moment.comments.push({
            "author": obj.nickname,
            "avatar": AppConfig.getImagePrefix() + obj.avatar,
            "content": obj.content,
            "time": obj.time,
          });
        }
        this.cd.detectChanges();
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  doLike() {
    let index = this.moment.likes.indexOf(this.accountData.account);
    if (index >= 0) {
      this.momentsService.addLike(this.accountData.id, this.moment.id).then(data => {
        if(data["status"] !== "200") {
          let alert = this.alertCtrl.create({
            title: 'ERROR',
            subTitle: 'NETWORK ERROR',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          this.moment["likes"].splice(index,1);
        }
      });
    }
    else {
      this.momentsService.addLike(this.accountData.id, this.moment.id).then(data => {
        if(data["status"] !== "200") {
          let alert = this.alertCtrl.create({
            title: 'ERROR',
            subTitle: 'NETWORK ERROR',
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          this.moment["likes"].push(this.accountData.account);
        }
      });
    }
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
              "avatar": AppConfig.getImagePrefix() + this.accountInformation.imageSrc,
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
