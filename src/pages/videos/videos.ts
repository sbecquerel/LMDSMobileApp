import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
//import { VideoPlayerProvider} from '../../providers/video-player/video-player';
import { VideoModel } from '../../app/models/video.model';
import { UserModel } from '../../app/models/user.model';
import { AuthProvider } from '../../providers/auth/auth';
import { VideoPage } from '../video/video';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {

  videos: Array<VideoModel> = [];
  private _searchQuery = '';
  private userEventsSubscription: Subscription;

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
    private auth: AuthProvider) {

    
  }

  ngOnInit() { 
    this.userEventsSubscription  = this.auth.userEvent.subscribe((user: UserModel) => {
      console.log('userEvent.subscribe');
      if (user !== undefined) {
        this._loadVideos();
      }
    });
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  _loadVideos() {
    console.log('_loadVideos');
    this.videoProvider.list()
      .subscribe(videos => this.videos = videos, err => {
        if (err.status === 403) {
          this.auth.user = undefined;
        }
      });
  }

  getVideos() {
    console.log('getVideos');
    this.videoProvider.list()
      .subscribe(videos => this.videos = videos.filter((video: VideoModel) => {
        return video.title.concat(video.tags).toLowerCase().indexOf(this.searchQuery) > -1;
      }), err => {
        if (err.status === 403) {
          this.auth.user = undefined;
        }
      });
  }

  resetList() {
    this._loadVideos();
  }

  doRefresh(refresher) {
    console.log('doRefresh');
    this.videoProvider.list()
      .subscribe(videos => {
        this.videos = videos;
        refresher.complete();
      }, err => {
        if (err.status === 403) {
          this.auth.user = undefined;
        }
        refresher.complete();
      });
  }

  goToVideo(video) {
    this.navCtrl.push(VideoPage, { video });
  }

  customHeaderFn(video: VideoModel, videoIndex, videos: Array<VideoModel>) {
    if (videoIndex > 0) {
      if (video.level !== videos[videoIndex - 1].level) {
        return `Niveau ${video.level}`;
      } else {
        return null;
      }
    } else {
      return `Niveau ${video.level}`;
    }
  }

  getSquaredThumbnail(videoId) {
    return this.videoProvider.squaredThumbnail(videoId);
  }
}
