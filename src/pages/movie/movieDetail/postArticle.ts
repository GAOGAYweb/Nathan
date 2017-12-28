import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MovieService } from "../../../services/MovieService"
import {UserService} from "../../../services/UserService";

@Component({
    selector: 'page-postArticle',
    templateUrl: 'postArticle.html',
})
export class PostArticlePage {

    accountData: { id: string, account: string };
    id: string;
    title: string;
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

    sendArticle(){
        this.movieService.addMovieArticle(this.accountData.id, this.id, this.content, this.title).then(data => {
            console.log("return data",data["status"]);
            if(this.content != "") {
                if (data["status"] === 200) {
                    let date = new Date();
                    let time = date.getFullYear()+"-"+(1+date.getMonth())+"-"+
                                date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
                    this.viewCtrl.dismiss({
                        content:this.content,
                        time: time,
                        title: this.title,
                        name: this.accountInformation.name,
                        short: this.content.substring(0,70),
                        avatar: this.accountInformation.imageSrc
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