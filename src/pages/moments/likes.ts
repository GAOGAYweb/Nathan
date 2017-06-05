import {ChangeDetectorRef, Component} from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
import { ModalNewPostPage } from './newPost';
import { ModalMomentDetailPage } from './momentDetail';
import {MomentsService} from "../../services/MomentsService";


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
      let moments = data["data"];
      this.moments = [];
      for (let moment in moments) {
        let obj = JSON.parse(moments[moment]);
        let new_moment = {
          "author": obj.account,
          "avatar": obj.avatar,
          "time": obj.time,
          "image": obj.imageSrc,
          "content": "<p>" + obj.content + "</p>",
          "likes": obj.likes,
          "comments": [],
          "tags": obj.tag
        };
        this.moments.push(new_moment);
      }
      this.cd.detectChanges();
    });
  }

  openModalNewPostPage() {
    let modal = this.modalCtrl.create(ModalNewPostPage);
    modal.onDidDismiss(data => {
      if(data.foo !== "bar") {
        let moment = {
          "author": data.author,
          "avatar": data.avatar,
          "time": data.time,
          "image": "advance-card-bttf.png",
          "content": "<p>"+ data.content +"</p>",
          "likes": [],
          "comments": [],
          "tags":["technique", "geek"]
        };
        console.log(data);
        this.moments.unshift(moment);
      }
    });
    modal.present();
  }

  openModalMomentDetailPage(moment) {
    let modal = this.modalCtrl.create(ModalMomentDetailPage, moment);
    modal.present();
  }


}
