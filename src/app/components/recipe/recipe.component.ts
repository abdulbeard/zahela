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
import { Recipe } from '../../models/DisplayRecipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class RecipeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private recipeService: RecipeService) {
    recipeService.getRecipesForUser().subscribe(
      x => {this.recipes = x; console.log(x)}, 
      error => console.log(error));
  }
  recipes: Array<Recipe>
}
