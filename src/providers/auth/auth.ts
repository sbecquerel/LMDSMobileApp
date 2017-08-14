import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { UserModel } from '../../app/models/user.model';
import { ConfigProvider } from '../../providers/config/config';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  userEvent = new BehaviorSubject<UserModel>(undefined);

  private _user : UserModel;

  set user(user: UserModel) {
    this._user = user;
    if (user) {
      this.requestOptions.headers.set('Authorization', `Bearer ${user.token}`);
      this.storage.set('user', JSON.stringify(user));
    } else {
      this.requestOptions.headers.delete('Authorization')      
      this.storage.remove('user');
    }
    this.userEvent.next(this._user);
  }

  get user(): UserModel {
    return this._user;
  }

  constructor(
    private http: Http, 
    private requestOptions: RequestOptions, 
    private config: ConfigProvider,
    private storage: Storage
  ) {
    this.storage.get('user')
      .then(user => {
        this.user = JSON.parse(user);
      });
  }

  authenticate(username, password): Observable<UserModel> {
    return this.http.post(`${this.config.apiUrl}/auth`, {username, password})
      .map(res => res.json())
      .do(user => this.user = user);
  }

  logout() {
    return this.http.get(`${this.config.apiUrl}/logout`)
      .do(() => this.user = undefined);
  }
}