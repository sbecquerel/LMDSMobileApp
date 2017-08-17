import { Injectable } from '@angular/core';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { ConfigProvider } from '../../providers/config/config';
import { UserModel } from '../../app/models/user.model';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class VideoPlayerProvider {
  orientation = 'landscape';
  user: UserModel;

  constructor(
    private streamingMedia: StreamingMedia, 
    private config: ConfigProvider, 
    private auth: AuthProvider) {
    this.auth.userEvent.subscribe(user => this.user = user);
  }

  play(videoId, successCallback, errorCallback) {
    this.streamingMedia.playVideo(`${this.config.videoUrl}/video/${videoId}/t/${this.user.token}`, {
      successCallback,
      errorCallback
    });    
  }
}