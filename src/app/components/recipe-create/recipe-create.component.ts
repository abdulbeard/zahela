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
import { Recipe, RecipeDescription, Ingredient, IngredientMeasure, Stage, Step } from '../../models/Recipe';
import { Router } from '@angular/router';
import { Routes } from '../../constants/Routes';
import { UserSessionService } from '../../services/UserSessionService';
import { AvatarService } from '../../services/AvatarService';
import { ImageService } from '../../services/ImageService';

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
  public step: string;
  public cookingStage: Stage;
  public cookingStep: string;

  ngAfterViewInit(): void {
  }
  constructor(private recipeService: RecipeService, private router: Router, private imageService: ImageService) {
    this.ingredient = new Ingredient("Cuantaloupe", "www.cantaloupe.com", 1, IngredientMeasure.Count, "Big yellow kind, like tatas", "this is some extra info. Must be fragrant");
  }
  recipes: Array<Recipe>
  getRecipeLink(recipe: Recipe) {
  }

  getMeasureName(measure: IngredientMeasure): string {
    return IngredientMeasure[measure];
  }

  getDividerSymbol(numberOfStars: number, name: string): string {
    var result = "*";
    for(var i = 0; i < numberOfStars; i++){
      result += "*";
    }
    return name ? `${result} ${name} ${result}` : result;
  }

  addEquipment(){
    this.recipe.EquipmentNeeded.push(this.equipment);
    this.equipment = '';
  }
  removeEquipment(equipment: string){
    this.recipe.EquipmentNeeded = this.recipe.EquipmentNeeded.filter(x => {return x !== equipment});
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
    var url = new URL(img);
    this.imageService.deleteImage(url.pathname).subscribe(x => {
    });
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

  addPrepStep(){
    this.prepStage.Steps.push(new Step(this.step));
    this.recipe.Preparation.push(this.prepStage);
  }

  addCookingStage(){
    if(!this.cookingStage){
      this.cookingStage = new Stage("", []);
    }
    else {
      this.recipe.ActualCooking.push(this.cookingStage);
    }
  }

  addCookingStep(){
    this.cookingStage.Steps.push(new Step(this.cookingStep));
    this.recipe.ActualCooking.push(this.cookingStage);
  }

  preview(){
    var user = UserSessionService.getCurrentUser();
    this.recipe.Id = "testRecipe";
    this.recipe.Origin = `${user.LastName}, ${user.FirstName}`;
    this.recipeService.setTestRecipe(this.recipe);
    return true;
    //this.router.navigate([Routes.recipeDetail.replace(':id', 'testRecipe')]);
  }

  getPreviewHref(): string {
    return Routes.recipeDetail.replace(':id', 'testRecipe');
  }

  onFileChanged(event) {
    let selectedFiles = event.target.files;
    this.imageService.uploadMultiple(selectedFiles)
      .subscribe(event => {
        setTimeout(() => {event.map(x => this.recipe.Description.Images.push(x));}, 10000)
        //event.map(x => this.recipe.Description.Images.push(x));
      });
  }
}
