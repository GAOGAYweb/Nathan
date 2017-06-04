import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModalNewPostPage } from './newPost';
import { ModalMomentDetailPage } from './momentDetail';
import {MomentsService} from "../../services/MomentsService";


@Component({
  templateUrl: 'likes.html'
})

export class LikesPage {

  moments: any;
  account: string;
  constructor(public modalCtrl: ModalController, private momentsService: MomentsService) {
    this.moments = momentsService.getMoments(this.account);
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
