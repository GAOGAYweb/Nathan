import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ProfileIonicPage} from "../profile-ionic";
@Component({
  selector: 'page-wahtsup-details',
  templateUrl: 'whatsup-ionic.html'
})
export class WhatsUpPage {
  description: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.description = navParams.get('description');
  }
  desClicked(event, description) {
    this.navParams.get('resolve')(description);
    this.navCtrl.popTo(ProfileIonicPage);
  }
}
