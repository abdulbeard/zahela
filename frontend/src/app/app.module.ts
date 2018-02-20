import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HtmlSanitizer } from './pipes/HtmlSanitizer'
import { UrlSanitizer } from './pipes/UrlSanitizer'

import { AppComponent } from './app.component';
import { SlackFeedComponent } from './components/slack-feed/slack-feed.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/AuthService';
import { FriendsComponent } from './components/friends/friends.component';
import { AdminComponent } from './components/admin/admin.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'messages/:channel', component: MessagesComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthService] },
  { path: 'hukaChaka', component: HomeComponent, canActivate: [AuthService] },
  { path: 'playlist', component: PlaylistComponent },
  { path: '', redirectTo: "/home", pathMatch: "full" }, //base url, no path
  { path: '**', redirectTo: "/home" }, //wrong url/404
];

@NgModule({
  declarations: [
    AppComponent, HtmlSanitizer, UrlSanitizer, SlackFeedComponent, MessagesComponent, HomeComponent, FriendsComponent, 
    AdminComponent, PlaylistComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
