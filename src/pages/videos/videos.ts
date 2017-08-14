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
  private _searchQuery = '';

  set searchQuery(value: string) {
    this._searchQuery = value.toLowerCase().trim();
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private videoProvider: VideoProvider,
    private player: VideoPlayerProvider,
    private auth: AuthProvider) {

    this.auth.userEvent.subscribe((user: UserModel) => {
      if (user !== undefined) {
        this._loadVideos();
      }
    })
  }

  _loadVideos() {
    this.videoProvider.list()
      .subscribe(videos => this.videos = videos, err => {
        if (err.status === 403) {
          this.auth.user = undefined;
        }
      });
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

  getVideos() {
    this.videoProvider.list()
      .subscribe(videos => this.videos = videos.filter((video: VideoModel) => {
        return video.title.concat(video.tags).toLowerCase().indexOf(this.searchQuery) > -1;
      }), err => {
        if (err.status === 403) {
          this.auth.user = undefined;
        }
      });
  }

  getThumbnails(videoId) {
    return this.videoProvider.thumbnails(videoId);
  }

  resetList() {
    this._loadVideos();
  }
}
