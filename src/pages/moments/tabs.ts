import { Component } from '@angular/core';

import { MomentsPage } from './moments';
import { LikesPage } from './likes';
import { RecommendPage } from './recommend';
import { NavController,NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MomentsPage;
  tab2Root = LikesPage;
  tab3Root = RecommendPage;
  accountData:any;
  accountPara:{accountData:any};
  constructor(public navParams: NavParams,public navCtrl: NavController) {
    this.accountData = navParams.data;
    this.accountPara = {accountData: this.accountData};
  }
}
