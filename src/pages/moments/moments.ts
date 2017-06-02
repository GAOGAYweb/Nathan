import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModalNewPostPage } from './newPost';
import { ModalMomentDetailPage } from './momentDetail';
import {MomentsService} from "../../services/MomentsService";


@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html'
})

export class MomentsPage {

  moments: any;
  account: string;
  constructor(public modalCtrl: ModalController, private momentsService: MomentsService) {
    this.moments = momentsService.getMoments(this.account);
  }

  openModalNewPostPage() {
    let modal = this.modalCtrl.create(ModalNewPostPage);
    modal.present();
  }

  openModalMomentDetailPage(moment) {
    let modal = this.modalCtrl.create(ModalMomentDetailPage, moment);
    modal.present();
  }

}
