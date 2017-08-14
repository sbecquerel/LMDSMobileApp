import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { VideoModel } from '../../app/models/video.model';
import { ConfigProvider } from '../../providers/config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class VideoProvider {

  constructor(public http: Http, private config: ConfigProvider) {}

  list(): Observable<Array<VideoModel>> {
    return this.http.get(`${this.config.apiUrl}/video`)
      .map(res => res.json());
  }

  thumbnails(videoId: Number): Array<String> {
    const thumbnails = [];

    for (let i = 1; i <= 4; i++) {
      thumbnails.push(`${this.config.apiUrl}/video/${videoId}/thumbnail/${i}`);
    }

    return thumbnails;
  }
}
