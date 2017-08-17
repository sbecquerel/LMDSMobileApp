import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoPlayerProvider } from '../../providers/video-player/video-player';
import { VideoProvider } from '../../providers/video/video';
import { VideoModel } from '../../app/models/video.model';

/**
 * Generated class for the VideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  video: VideoModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private player: VideoPlayerProvider,
    private videoProvider: VideoProvider) {
    this.video = navParams.data.video;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  playVideo() {
    this.player.play(
      this.video.videoId,
      () => this.navCtrl.pop(),
      () => this.navCtrl.pop()
    );
  }

  getThumbnails() {
    return this.videoProvider.thumbnails(this.video.videoId);
  }

  setFavorite(videoId) {
    console.log(videoId);
  }

  getTags(tags) {
    if (!tags) {
      return [];
    }
    return tags.split(' ').map(tag => tag.trim())
  }

  getFavorite(favorite) {
    if (favorite === null || favorite === undefined || favorite == 0) {
      return false;
    }

    return true;
  }
}
