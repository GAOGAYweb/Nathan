import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RequestOptions, Headers, Http } from '@angular/http';
import { MovieService } from "../../../services/MovieService";
import { ChangeDetectorRef } from '@angular/core';
import { PostCommentPage } from "./postComment";
import { PostArticlePage } from "./postArticle";
import { ArticlePage } from "./article";
//import { postArticalPage } from "./postArticle";
import { AppConfig } from "../../../app/app.config";

@Component({
    selector: 'page-movieDetail',
    templateUrl: 'movieDetail.html',
})
export class MovieDetailPage {

    detail: any;
    accountData: { id: string, account: string };
    comments = [];

    articles = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
        public movieService: MovieService, public cd: ChangeDetectorRef, public modalCrtl: ModalController) {
        this.detail = navParams.get("detail");
        this.accountData = navParams.get("account");
        this.getComments();
        this.getArticle();
    }

    getComments() {
        this.movieService.getCommnets(this.detail.id).then(data => {
            console.log(data);
            let moments = data["data"];
            for (let moment in moments) {
                let obj = JSON.parse(moments[moment]);
                let new_moment = {
                    "name": obj.nickname,
                    "avatar": AppConfig.getImagePrefix() + obj.avatar,
                    "time": obj.time,
                    "content": obj.content
                };
                this.comments.push(new_moment);
            }
        });
    }

    presentPostComment() {
        let modal = this.modalCrtl.create(PostCommentPage, {
            id: this.detail.id,
            account: this.accountData
        });
        modal.onDidDismiss(data => {
            console.log("comment", data);
            if (data.foo !== "bar") {
                this.comments.push({
                    name: data.name,
                    content: data.content,
                    time: data.time,
                    avatar: AppConfig.getImagePrefix() + data.avatar
                });
                this.cd.detectChanges();
            }
        });
        modal.present();
    }

    presentPostArticle() {
        let modal = this.modalCrtl.create(PostArticlePage, {
            id: this.detail.id,
            account: this.accountData
        });
        modal.onDidDismiss(data => {
            console.log("article", data);
            if (data.foo !== "bar") {
                this.articles.push({
                    name: data.name,
                    content: data.content,
                    time: data.time,
                    title: data.title,
                    short: data.short,
                    avatar: data.avatar
                });
                this.cd.detectChanges();
            }
        });
        modal.present();
    }

    getArticle(){
        this.movieService.getArticles(this.detail.id).then(data => {
            console.log("article", data);
            let articles = data["data"];
            for (let article in articles) {
                let obj = JSON.parse(articles[article]);
                let new_moment = {
                    "name": obj.nickname,
                    "avatar": obj.avatar,
                    "time": obj.time,
                    "content": obj.content,
                    "short": obj.short,
                    "title": obj.title
                };
                this.articles.push(new_moment);
            }
        });
    }

    intoArticle(article) {
        this.navCtrl.push(ArticlePage, {
            article: article
        });
    }



}