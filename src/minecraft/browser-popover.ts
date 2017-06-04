/**
 * Created by Administrator on 2017/6/4.
 */
import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";

@Component({
  template: `
    <ion-list>
      <button ion-item detail-none (click)="refresh()">refresh</button>
      <button ion-item detail-none (click)="share()" *ngIf="parentCallback.share">share</button>
      <button ion-item detail-none (click)="close()">close</button>
    </ion-list>
  `
})
export class BrowserPopoverPage {
  parentCallback: {refresh: () => void, share?: () => void, close: () => void};

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {
    this.parentCallback = this.navParams.data.callback;
  }

  refresh() {
    this.parentCallback.refresh();
    this.viewCtrl.dismiss();
  }

  share() {
    this.parentCallback.share();
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
    this.parentCallback.close();
  }
}
