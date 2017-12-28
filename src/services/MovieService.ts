import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AppConfig } from "../app/app.config";
@Injectable()
export class MovieService {

    server: string;

    constructor(private http: Http) {
        this.server = AppConfig.getServerUrl() + '/movie';
    }

    getMovie(type, offset, limit) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body = "type=" + type + "&offset=" + offset + "&limit=" + limit;
        return new Promise((resolve, reject) => {
            this.http.post(this.server+'/list', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data)
                }, err => reject(err))
        })
    }

    movieDetail(id){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body = "id=" + id;
        return new Promise((resolve, reject) => {
            this.http.post(this.server+'/detail', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data)
                }, err => reject(err))
        }) 
    }

    addMovieComment(accountid,movieid,content){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body = "id=" + accountid + "&movie=" + movieid + "&content=" + content;
        return new Promise((resolve, reject) => {
            this.http.post(this.server+'/addComment', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data)
                }, err => reject(err))
        })  
    }

    getCommnets(movieid){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body = "id=" + movieid;
        return new Promise((resolve, reject) => {
            this.http.post(this.server+'/listComment', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data)
                }, err => reject(err))
        })  
    }

    addMovieArticle(accountid, movieid, content, title){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body = "id=" + accountid + "&movie=" + movieid + "&content=" +content+ "&title=" +title;
        return new Promise((resolve, reject) => {
            this.http.post(this.server+'/addMovieComment', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data)
                }, err => reject(err))
        })   
    }

    getArticles(movieid){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body = "id=" + movieid;
        return new Promise((resolve, reject) => {
            this.http.post(this.server+'/listMovieComment', body, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data)
                }, err => reject(err))
        })  
    }

}