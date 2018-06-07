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
import { FaqComponent } from './components/faqs/faq.component';
import { SlackAuthService } from './services/SlackAuthService';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeService } from './services/RecipeService';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { ForumComponent } from './components/forum/forum.component';
import { ForumService } from './services/ForumService';
import { AvatarService } from './services/AvatarService';
import { ImageCropperComponent } from "ng2-image-cropper"

const appRoutes: Routes = [
  { path: AppRoutes.home, component: HomeComponent },
  { path: AppRoutes.account, component: AccountComponent, canActivate: [AuthService] },
  { path: AppRoutes.accountExtended, component: AccountComponent, canActivate: [AuthService] },
  { path: AppRoutes.messagesExtended, component: MessagesComponent },
  { path: AppRoutes.messages, component: MessagesComponent },
  { path: AppRoutes.friends, component: FriendsComponent, canActivate: [AuthService], },
  { path: AppRoutes.admin, component: AdminComponent, canActivate: [AuthService] },
  { path: AppRoutes.hukaChaka, component: HomeComponent, canActivate: [AuthService] },
  { path: AppRoutes.login, component: LoginComponent },
  { path: AppRoutes.playlist, component: PlaylistComponent },
  { path: AppRoutes.faqExtended, component: FaqComponent},
  { path: AppRoutes.faq, component: FaqComponent},
  { path: AppRoutes.recipe, component: RecipeComponent},
  { path: AppRoutes.recipeDetail, component: RecipeDetailComponent},
  { path: AppRoutes.forum, component: ForumComponent, canActivate: [AuthService]},
  { path: AppRoutes.forumDetail, component: ForumComponent, canActivate: [AuthService]},
  { path: AppRoutes.forumDetailComment, component: ForumComponent, canActivate: [AuthService]},
  { path: AppRoutes.empty, redirectTo: AppRoutes.home, pathMatch: "full" }, //base url, no path
  { path: AppRoutes.wildCard, redirectTo: AppRoutes.home }, //wrong url/404
];

@NgModule({
  declarations: [
    AppComponent, HtmlSanitizer, UrlSanitizer, SlackFeedComponent, MessagesComponent, HomeComponent, FriendsComponent, 
    AdminComponent, PlaylistComponent, LoginComponent, AccountComponent, FaqComponent, RecipeComponent, RecipeDetailComponent,
    ForumComponent, ImageCropperComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(
      appRoutes, 
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [AuthService, SlackAuthService, RecipeService, ForumService, AvatarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
