import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestOptions, Headers, Http } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import {AppConfig} from "../../../app/app.config";
import {UserService} from "../../../services/UserService";

@Component({
    selector: 'page-article',
    templateUrl: 'article.html',
})
export class ArticlePage {

    article: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
        public cd: ChangeDetectorRef, public userService: UserService) {
        this.article = navParams.get("article");
        this.article["avatar"] = AppConfig.getImagePrefix() + this.article.avatar;
        //this.getComments(); 
    }
}