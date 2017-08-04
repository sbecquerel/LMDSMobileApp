import { Injectable } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { ConfigProvider } from '../../providers/config/config';
import { UserModel } from '../../app/models/user.model';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class VideoPlayerProvider {
  options: StreamingVideoOptions;
  orientation = 'landscape';
  user: UserModel;

  constructor(
    private streamingMedia: StreamingMedia, 
    private config: ConfigProvider, 
    private auth: AuthProvider) {
    this.options = {
      successCallback: this.success,
      errorCallback: this.error,
      orientation: this.orientation
    }  
    this.auth.userEvent.subscribe(user => this.user = user);
  }

  play(videoId) {
    console.log(`${this.config.apiUrl}/video/${videoId}/t/${this.user.token}`);
    this.streamingMedia.playVideo(`${this.config.apiUrl}/video/${videoId}/t/${this.user.token}`, this.options);
  }

  success() {
    console.log('Video played');
  }

  error(e) {
    console.log('Error streaming');
  }
}