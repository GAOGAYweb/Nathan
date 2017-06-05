import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ProfileIonicPage} from "../profile-ionic";
import {UserService} from "../../../../services/UserService";
@Component({
  selector: 'page-wahtsup-details',
  templateUrl: 'whatsup-ionic.html',
  providers:[UserService],
})
export class WhatsUpPage {
  description: string;
  id:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private request: UserService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.description = navParams.get('description');
    this.id = navParams.get("id");
  }
  desClicked(event, description) {
    this.navParams.get('resolve')(description);
    this.request.changeInformation({
      description: this.description
    }, this.id).then(data => {
      this.navCtrl.popTo(ProfileIonicPage);
    });

  }
}
