import { Component } from '@angular/core';
import { AlertController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-momentDetail',
  templateUrl: 'momentDetail.html'
})

export class ModalMomentDetailPage {
  moment;

  constructor(public viewCtrl: ViewController, public params: NavParams, public alertCtrl: AlertController) {
    this.moment = this.params.get('moment');
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
            console.log('Submit clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}