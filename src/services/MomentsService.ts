/**
 * Created by Administrator on 2017/6/2.
 */
import { Injectable }    from '@angular/core';
import { RequestOptions,Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class MomentsService {

  server: string;
  constructor(private http: Http) {
    this.server = ""
  }
  getMoments(account) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });

    let MOMENTS = [
      {
        "author": "Marty McFly",
        "avatar": "marty-avatar.png",
        "time": "November 5, 1955",
        "image": "advance-card-bttf.png",
        "content": "<p>Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.</p>",
        "likes": ["Bullseye", "Hamm"],
        "tags":["technique", "geek"],
        "comments": [{
          "author": "Woody",
          "avatar": "avatar-ts-woody.png",
          "content": "This town ain't big enough for the two of us!",
          "time": "3:43 pm"
        }, {
          "author": "Hamm",
          "avatar": "avatar-ts-hamm.png",
          "content": "You heard of Kung Fu? Well get ready for pork chop.",
          "time": "3:43 pm"
        }]
      },
      {
        "author": "Sarah Connor",
        "avatar": "sarah-avatar.png.jpeg",
        "time": "May 12, 1984",
        "image": "advance-card-tmntr.jpg",
        "content": "<p>I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.</p>",
        "likes": ["Woody"],
        "tags":["technique", "geek"],
        "comments": [{
          "author": "Woody",
          "avatar": "avatar-ts-woody.png",
          "content": "This town ain't big enough for the two of us!",
          "time": "3:43 pm"
        }]
      },
      {
        "author": "Dr. Ian Malcolm",
        "avatar": "ian-avatar.png",
        "time": "June 28, 1990",
        "image": "advance-card-jp.jpg",
        "content": "<p>Your scientists were so preoccupied with whether or not they could, that they didn't stop to think if they should.</p>",
        "likes": ["Woody"],
        "tags":["technique", "geek"],
        "comments": [{
          "author": "Hamm",
          "avatar": "avatar-ts-hamm.png",
          "content": "You heard of Kung Fu? Well get ready for pork chop.",
          "time": "3:43 pm"
        }]
      }
    ];

    return MOMENTS;
  }
  sendMoments(data) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });

    let body;
    return new Promise((resolve, reject) => {
      this.http.post(this.server + '/user', body, options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  }

}
