import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestOptions, Headers, Http } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { MovieService } from "../../services/MovieService";
import { MovieDetailPage } from "./movieDetail/movieDetail";

@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {

  hotMovies: any[];
  tempList: any[];
  offset = 0;
  accountData: { id: string, account: string };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public movieService: MovieService,  public cd: ChangeDetectorRef) {
    this.accountData = navParams.data.accountData;
    if (!this.accountData) {
      this.accountData = navParams.data;
    }
    this.hotMovies = [];
    this.movies(this.offset);
    //this.cd.detectChanges();
  }

  movies(offset) {
    console.log("enter");
    this.movieService.getMovie('hot', offset, 10).then(data => {
      console.log('movie', data);
      this.tempList = data["data"]["movies"];
      this.hotMovies = this.hotMovies.concat(this.tempList);
      this.cd.detectChanges();
    });
    this.offset += 10;
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.movies(this.offset);
      infiniteScroll.complete();
    }, 500);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.hotMovies = [];
      this.offset = 0;
      this.movies(this.offset);
      refresher.complete();
    }, 2000);
  }

  intoDetails(id) {
    let detail;
    this.movieService.movieDetail(id).then(data => {
      console.log('movieDetails', data);
      detail = data['data']['MovieDetailModel'];
      console.log(detail);
      this.navCtrl.push(MovieDetailPage, {
        account: this.accountData,
        detail: detail
      });
    });

  }

}
