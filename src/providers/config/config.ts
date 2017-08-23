import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

  // apiUrl = 'http://91.121.152.202:8080';
  apiUrl = '/api';
  videoUrl = 'http://91.121.152.202:8080';

  constructor() {
  }
}
