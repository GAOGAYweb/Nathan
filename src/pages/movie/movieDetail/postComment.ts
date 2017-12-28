import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MovieService } from "../../../services/MovieService"
import {UserService} from "../../../services/UserService";

@Component({
    selector: 'page-postComment',
    templateUrl: 'postComment.html',
})
export class PostCommentPage {

    accountData: { id: string, account: string };
    id: string;
    content: string;
    accountInformation: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
                public movieService: MovieService, public userService: UserService) {
        this.accountData = navParams.get("account");
        this.accountInformation = JSON.parse(this.userService.getSessionUserInformation());
        this.id = navParams.get("id");
        console.log(this.accountInformation);
    }

    dismiss() {
        this.viewCtrl.dismiss({"foo":"bar"});
    }

    sendComment(){
        this.movieService.addMovieComment(this.accountData.id , this.id, this.content).then(data => {
            console.log("return data",data["status"]);
            if(this.content != "") {
                if (data["status"] === 200) {
                    let date = new Date();
                    let time = date.getFullYear()+"-"+(1+date.getMonth())+"-"+
                                date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
                    this.viewCtrl.dismiss({
                        content:this.content,
                        time: time,
                        avatar: this.accountInformation.imageSrc,
                        name: this.accountInformation.name
                    });
                }
                else {
                    this.viewCtrl.dismiss({"foo":"bar"});
                }
            } else {
                this.viewCtrl.dismiss({"foo":"bar"});
            }
        });
    }

}