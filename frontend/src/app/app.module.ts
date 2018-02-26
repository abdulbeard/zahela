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
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { FormsModule } from '@angular/forms';
import { Routes as AppRoutes }  from './constants/Routes';

const appRoutes: Routes = [
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.account, component: AccountComponent },
  { path: AppRoutes.messagesExtended, component: MessagesComponent },
  { path: AppRoutes.messages, component: MessagesComponent },
  { path: AppRoutes.friends, component: FriendsComponent, canActivate: [AuthService], },
  { path: AppRoutes.admin, component: AdminComponent, canActivate: [AuthService] },
  { path: AppRoutes.hukaChaka, component: HomeComponent, canActivate: [AuthService] },
  { path: AppRoutes.login, component: LoginComponent },
  { path: AppRoutes.playlist, component: PlaylistComponent },
  { path: AppRoutes.empty, redirectTo: AppRoutes.home, pathMatch: "full" }, //base url, no path
  { path: AppRoutes.wildCard, redirectTo: AppRoutes.home }, //wrong url/404
];

@NgModule({
  declarations: [
    AppComponent, HtmlSanitizer, UrlSanitizer, SlackFeedComponent, MessagesComponent, HomeComponent, FriendsComponent, 
    AdminComponent, PlaylistComponent, LoginComponent, AccountComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(
      appRoutes, 
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
