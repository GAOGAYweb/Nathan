import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModalNewPostPage } from './newPost';
import { ModalMomentDetailPage } from './momentDetail';


@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html'
})

export class MomentsPage {

  moments = MOMENTS;

  constructor(public modalCtrl: ModalController) { }

  openModalNewPostPage() {
    let modal = this.modalCtrl.create(ModalNewPostPage);
    modal.present();
  }

  openModalMomentDetailPage(moment) {
    let modal = this.modalCtrl.create(ModalMomentDetailPage, moment);
    modal.present();
  }

}

let MOMENTS = [
    {
        "author": "Marty McFly",
        "avatar": "marty-avatar.png",
        "time": "November 5, 1955",
        "image": "advance-card-bttf.png",
        "content": "<p>Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.</p>",
        "likes": ["Bullseye", "Hamm"],
        "comments": [{
            "author": "Woody",
            "avatar": "avatar-ts-woody.png",
            "content": "This town ain't big enough for the two of us!",
            "time": "3:43 pm"
        }, {
            "author": "Hamm",
            "avatar": "avatar-ts-hamm.png",
            "content": "You heard of Kung Fu? Well get ready for pork chop.",
            "time": "3:43 pm"
        }]
    },
    {
        "author": "Sarah Connor",
        "avatar": "sarah-avatar.png.jpeg",
        "time": "May 12, 1984",
        "image": "advance-card-tmntr.jpg",
        "content": "<p>I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.</p>",
        "likes": ["Woody"],
        "comments": [{
            "author": "Woody",
            "avatar": "avatar-ts-woody.png",
            "content": "This town ain't big enough for the two of us!",
            "time": "3:43 pm"
        }]
    },
    {
        "author": "Dr. Ian Malcolm",
        "avatar": "ian-avatar.png",
        "time": "June 28, 1990",
        "image": "advance-card-jp.jpg",
        "content": "<p>Your scientists were so preoccupied with whether or not they could, that they didn't stop to think if they should.</p>",
        "likes": ["Woody"],
        "comments": [{
            "author": "Hamm",
            "avatar": "avatar-ts-hamm.png",
            "content": "You heard of Kung Fu? Well get ready for pork chop.",
            "time": "3:43 pm"
        }]
    }
];