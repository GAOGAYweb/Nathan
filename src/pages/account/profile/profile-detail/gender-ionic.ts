/**
 * Created by Administrator on 2017/5/1.
 */
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {ProfileIonicPage} from "../profile-ionic";


@Component({
  selector: 'page-gender-details',
  templateUrl: 'gender-ionic.html'
})
export class GenderIonicPage {
  genderEum: any;
  gender: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.gender = navParams.get('gender');
    this.genderEum = [];
    if (this.gender === "Male") {
      this.genderEum.push({
        item: "Male",
        value: true,
      });
      this.genderEum.push({
        item: "Female",
        value: false,
      });
    }
    else {
      this.genderEum.push({
        item: "Male",
        value: false,
      });
      this.genderEum.push({
        item: "Female",
        value: true,
      });
    }
  }
  genderClicked(event, gender) {
    this.navParams.get('resolve')(gender);
    this.navCtrl.popTo(ProfileIonicPage);
  }
}
