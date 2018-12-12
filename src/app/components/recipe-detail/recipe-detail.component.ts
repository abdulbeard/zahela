import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/Recipe';
import { RecipeService } from '../../services/RecipeService';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class RecipeDetailComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  private recipeId: string;
  private recipe: Recipe
  constructor(private route: ActivatedRoute, private recipeService: RecipeService){
    route.params.subscribe(param => {
      this.recipeId = param["id"];
      this.recipeService.getRecipeById(this.recipeId).then(recipe => {
        console.log(recipe);
        console.log(recipe.Ingredients[0]);
        this.recipe = recipe;
      }, (Error) => {
        console.log(Error);
      })
    }, (Error) => {
      console.log(Error);
    })
  }

  getDividerSymbol(numberOfStars: number): string {
    var result = "*";
    for(var i = 0; i < numberOfStars; i++){
      result += "*";
    }
    return result;
  }
}
