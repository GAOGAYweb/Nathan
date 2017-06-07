/**
 * Created by Administrator on 2017/6/3.
 */
import { Injectable }    from '@angular/core';
import { RequestOptions,Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class ChatService {
    url='http://120.76.144.133:9080/adweb/';
    constructor(private http: Http) {

    }
    init() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body="";
        return new Promise((resolve, reject) => {
        this.http.post(this.url+"chat", body, options )
            .map(res => res.json())
            .subscribe(data => resolve(data), err => reject(err))
        })
    }

    addChat(from,to,content){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body="from="+from+"&to="+to+"&content="+content;
        return new Promise((resolve, reject) => {
        this.http.post(this.url+'message/add', body, options )
            .map(res => res.json())
            .subscribe(data => resolve(data), err => reject(err))
        })
    }

    queryChat(from,to){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let body="from="+from+"&to="+to;
        return new Promise((resolve, reject) => {
        this.http.post(this.url+'message/query', body, options )
            .map(res => res.json())
            .subscribe(data => resolve(data), err => reject(err))
        })
    }


}
