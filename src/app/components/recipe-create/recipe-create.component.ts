import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { RecipeService } from '../../services/RecipeService';
import { Recipe, RecipeDescription } from '../../models/Recipe';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class RecipeCreateComponent implements AfterViewInit {
  
  public recipe: Recipe = new Recipe(
    null, null, new RecipeDescription([
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg",
      "/assets/profile_pic_1.jpg"
    ], null, null, null, [], null), [], [], [], [], null, null);

  public tag: string = '';
  public image: string = '';
  public equipment: string = '';

  ngAfterViewInit(): void {
  }
  constructor(private recipeService: RecipeService) {
  }
  recipes: Array<Recipe>
  getRecipeLink(recipe: Recipe) {
  }

  addTag(){
    this.recipe.Description.Tags.push(this.tag);
  }
}
