import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { VideoPlayerProvider} from '../../providers/video-player/video-player';
import { VideoModel } from '../../app/models/video.model';
import { UserModel } from '../../app/models/user.model';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {

  videos: Array<VideoModel> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private videoProvider: VideoProvider,
    private player: VideoPlayerProvider,
    private auth: AuthProvider) {

    this.auth.userEvent.subscribe((user: UserModel) => {
      if (user !== undefined) {
        this.videoProvider.list()
          .subscribe(videos => this.videos = videos);
      }
    })
  }

  playVideo(videoId) {
    this.player.play(videoId);
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
