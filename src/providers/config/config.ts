import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class ConfigProvider {

  //_apiUrl = 'http://127.0.0.1:8080';
  _apiUrl = 'http://91.121.152.202:8080';

  get apiUrl() {
    return this._apiUrl;
  }

  constructor(private platform: Platform) {
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      this._apiUrl = '/api';
    }
  }
}
