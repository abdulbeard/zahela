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
import { Recipe, RecipeDescription, Ingredient, IngredientMeasure, Stage } from '../../models/Recipe';

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
      // "/assets/profile_pic_1.jpg",
      // "/assets/profile_pic_1.jpg",
      // "/assets/profile_pic_1.jpg",
      // "/assets/profile_pic_1.jpg",
      // "/assets/profile_pic_1.jpg",
      // "/assets/profile_pic_1.jpg"
    ], null, null, null, [], null), [], [], [], [], null, null);

  public tag: string = '';
  public image: string = '';
  public equipment: string = '';
  public ingredient: Ingredient = new Ingredient("", "", 0, IngredientMeasure.Count, "", "");
  public prepStage: Stage;

  ngAfterViewInit(): void {
  }
  constructor(private recipeService: RecipeService) {
    this.ingredient = new Ingredient("Cuantaloupe", "www.cantaloupe.com", 1, IngredientMeasure.Count, "Big yellow kind, like tatas", "this is some extra info. Must be fragrant");
  }
  recipes: Array<Recipe>
  getRecipeLink(recipe: Recipe) {
  }

  getMeasureName(measure: IngredientMeasure): string {
    return IngredientMeasure[measure];
  }

  addTag(){
    this.recipe.Description.Tags.push(this.tag);
    this.tag = '';
  }

  removeTag(tag: string){
    this.recipe.Description.Tags = this.recipe.Description.Tags.filter(x => {return x !== tag});
  }

  addImage(){
    this.recipe.Description.Images.push(this.image);
    this.image = '';
  }

  removeImage(img: string){
    this.recipe.Description.Images = this.recipe.Description.Images.filter(x => {return x !== img});
  }

  addIngredient(){
    console.log(this.ingredient);
    this.recipe.Ingredients.push(this.ingredient);
    this.ingredient = new Ingredient("","",0,IngredientMeasure.Count,"","");
  }

  removeIngredient(ingr: Ingredient){
    this.recipe.Ingredients = this.recipe.Ingredients.filter(x => {return x.Name !== ingr.Name});
  }

  editIngredient(ingr: Ingredient){
    this.ingredient = ingr;
    this.removeIngredient(ingr);
  }

  addPrepStage(){
    if(!this.prepStage){
      this.prepStage = new Stage("", []);
    }
    else {
      this.recipe.Preparation.push(this.prepStage);
    }
  }
}
