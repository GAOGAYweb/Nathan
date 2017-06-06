import {ChangeDetectorRef, Component} from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
import { ModalMomentDetailPage } from './momentDetail';
import {MomentsService} from "../../services/MomentsService";
import {AppConfig} from "../../app/app.config";


@Component({
  templateUrl: 'likes.html'
})

export class LikesPage {
  accountData: {id:string, account:string};
  moments: any;
  constructor(public modalCtrl: ModalController, private momentsService: MomentsService, public navParams: NavParams, public cd: ChangeDetectorRef) {
    if (!this.accountData) {
      this.accountData = navParams.data.accountData;
    }
    momentsService.getFriendsCycle(this.accountData.id, 0).then(data => {
      this.moments = [];
      console.log(data);
      this.addMoments(data);
      this.cd.detectChanges();
    });
  }
  addMoments(data) {
    let moments = data["data"];
    for (let moment in moments) {
      let obj = JSON.parse(moments[moment]);
      let new_moment = {
        "id": obj.id,
        "author": obj.account,
        "avatar": AppConfig.getImagePrefix() + obj.avatar,
        "time": obj.time,
        "image": AppConfig.getImagePrefix() +  obj.imageSrc,
        "content": "<p>"+ obj.content +"</p>",
        "likes": obj.likes,
        "comments": [],
        "streetName": obj.streetName === undefined ? "" : obj.streetName,
        "commentsSize": obj.commentSize,
        "tags":obj.tag
      };
      this.moments.push(new_moment);
    }
  }

  openModalMomentDetailPage(moment) {
    let modal = this.modalCtrl.create(ModalMomentDetailPage, {moment:moment, accountData: this.accountData});
    modal.present();
  }
}
