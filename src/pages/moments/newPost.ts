import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-newPost',
  templateUrl: 'newPost.html'
})

export class ModalNewPostPage {
  character;

  constructor(public viewCtrl: ViewController) { }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}