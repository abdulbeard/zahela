import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HtmlSanitizer } from './pipes/HtmlSanitizer'

import { AppComponent } from './app.component';
import { SlackFeedComponent } from './components/slack-feed/slack-feed.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'messages/:channel', component: MessagesComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '', redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent, HtmlSanitizer, SlackFeedComponent, MessagesComponent, HomeComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
