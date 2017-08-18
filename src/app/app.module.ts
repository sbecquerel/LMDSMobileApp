import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { VideosPage } from '../pages/videos/videos';
import { VideoPage } from '../pages/video/video';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { VideoPlayerProvider } from '../providers/video-player/video-player';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { VideoProvider } from '../providers/video/video';
import { ConfigProvider } from '../providers/config/config';
import { IonicStorageModule } from '@ionic/storage';
import { TagsPipe } from '../pipes/tags/tags';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    VideosPage,
    VideoPage,
    TagsPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    VideosPage,
    VideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StreamingMedia,
    VideoPlayerProvider,
    VideoProvider,
    AuthProvider,
    ConfigProvider
  ]
})
export class AppModule {}
