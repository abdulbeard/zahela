import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { RecipeService } from '../../services/RecipeService';
import { Recipe, RecipeDescription, Ingredient, IngredientMeasure, Stage, Step } from '../../models/Recipe';
import { Router, ActivatedRoute } from '@angular/router';
import { Routes } from '../../constants/Routes';
import { UserSessionService } from '../../services/UserSessionService';
import { ImageService } from '../../services/ImageService';
import { Location } from '@angular/common';

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
  public imageLoading: boolean = false;

  public prep: string = "";
  public cooking: string = "";
  public equipments: Array<any> = [{val:""},{val:""},{val:""}];
  public ingredients: Array<Ingredient> = Array.of(
    new Ingredient("", "", 0, IngredientMeasure.Count, "", ""),
    new Ingredient("", "", 0, IngredientMeasure.Count, "", ""),
    new Ingredient("", "", 0, IngredientMeasure.Count, "", "")
  );

  private testRecipe: string = "testRecipe";

  ngAfterViewInit(): void {
  }
  constructor(private recipeService: RecipeService, 
      private router: Router, 
      private activatedRoute: ActivatedRoute, 
      private imageService: ImageService,
      private location: Location) {
    this.ingredient = new Ingredient("Cuantaloupe", "www.cantaloupe.com", 1, IngredientMeasure.Count, "Big yellow kind, like tatas", "this is some extra info. Must be fragrant");

    activatedRoute.params.subscribe(x => {
      var recipeId = x["recipeId"];
      console.log(x);
      console.log('got recipeId: ', recipeId);
      if(recipeId){
        this.recipeService.getRecipeById(recipeId).then(y => {
          console.log(y);
          this.recipe = y;
          this.tag = '';
          this.image = '';
          this.equipment = '';
          this.ingredient = new Ingredient("", "", 0, IngredientMeasure.Count, "", "");
          this.prepStage = new Stage("", []);
          this.cookingStage = new Stage("", []);
          this.step = '';
          this.cookingStep = '';
          this.ingredients = y.Ingredients;
          this.equipments = y.EquipmentNeeded.map(x => {return {val:x}});
          this.prep = (y.Preparation && y.Preparation[0] && y.Preparation[0].Steps && y.Preparation[0].Steps[0]) ? y.Preparation[0].Steps[0].Instructions : "";
          this.cooking = (y.ActualCooking && y.ActualCooking[0] && y.ActualCooking[0].Steps && y.ActualCooking[0].Steps[0]) ? y.ActualCooking[0].Steps[0].Instructions : "";
        }).catch(x => {});
      }
  })
  }
  //recipes: Array<Recipe>
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

  removeImage(img: string) {
    this.recipe.Description.Images = this.recipe.Description.Images.filter(x => { return x !== img });
    if (url) {
      var url = new URL(img);
      this.imageService.deleteImage(url.pathname).subscribe(x => {
      });
    }
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

  addPrepStage(newOne: boolean){
    if(!this.prepStage || newOne){
      this.prepStage = new Stage("", []);
    }
    // else {
      var matchingPrepStage = this.recipe.Preparation.filter(x => x.Name === this.prepStage.Name);
      if(matchingPrepStage.length > 0){
        matchingPrepStage.forEach(x => x.Steps.push(new Step(this.step)));
      }
      else {
        this.recipe.Preparation.push(this.prepStage);
      }
    // }
  }

  addPrepStep(){
    //this.prepStage.Steps.push(new Step(this.step));
    this.addPrepStage(false);
    this.step = "";
    //this.recipe.Preparation.push(this.prepStage);
  }

  addCookingStage(newOne: boolean){
    if(!this.cookingStage || newOne){
      this.cookingStage = new Stage("", []);
    }
    // else {
      var matchingCookingStage = this.recipe.ActualCooking.filter(x => x.Name === this.cookingStage.Name);
      if(matchingCookingStage.length > 0){
        matchingCookingStage.forEach(x => x.Steps.push(new Step(this.cookingStep)));
      }
      else {
        this.recipe.ActualCooking.push(this.cookingStage);
      }
    // }
  }

  addCookingStep(){
    this.addCookingStage(false);
    this.cookingStep = "";
  }

  preview(){
    this.prepareTheRecipe();

    console.log(this.recipe);

    //this.router.navigate([`${Routes.recipeCreateWithId.replace(':recipeId', this.testRecipe)}`], {replaceUrl: true});

    this.location.replaceState(`${Routes.recipeCreateWithId.replace(':recipeId', this.testRecipe)}`);
    this.router.navigate([this.getPreviewHref()]);
    return true;
    //this.router.navigate([Routes.recipeDetail.replace(':id', 'testRecipe')]);
  }

  getPreviewHref(): string {
    return Routes.recipeDetail.replace(':id', this.testRecipe);
  }

  onFileChanged(event) {
    let selectedFiles = event.target.files;
    this.imageLoading = true;
    this.imageService.uploadMultiple(selectedFiles)
      .subscribe(event => {
        setTimeout(() => {
          event.map(x => this.recipe.Description.Images.push(x));
          this.imageLoading = false;
        }, 10000)
        //event.map(x => this.recipe.Description.Images.push(x));
      });
  }

  prepareTheRecipe()
  {
    var user = UserSessionService.getCurrentUser();
    this.recipe.Id = this.testRecipe;
    this.recipe.Source = `${user.LastName}, ${user.FirstName}`;
    this.recipe.ActualCooking = Array.of(new Stage("", Array.of(new Step(this.cooking))));
    this.recipe.Preparation = Array.of(new Stage("", Array.of(new Step(this.prep))));
    console.log(this.recipe.EquipmentNeeded);
    this.recipe.EquipmentNeeded = this.equipments.filter(x => x.val).map(x => x.val);
    console.log(this.recipe.EquipmentNeeded);
    this.recipe.Ingredients = this.ingredients.filter(x => x.Name);
    this.recipeService.setTestRecipe(this.recipe);
  }

  saveRecipe() {
    this.prepareTheRecipe();
    
    var observable = (this.recipe.Id && this.recipe.Id !== this.testRecipe) ? this.recipeService.updateRecipe(this.recipe) : this.recipeService.createRecipe(this.recipe);

    observable.subscribe(x => {
        console.log(x);
        var route = Routes.recipeDetail.replace(":id", x["id"]);
        console.log(route);
        this.router.navigate([route])
      });
  }

  textAreaKeyPress(elem: any){
    console.log(elem);
    var element = <HTMLElement> elem.srcElement;
    var rows = parseInt(element.getAttribute("rows"));
    console.log(element.scrollHeight, element.clientHeight, rows);
    console.log(elem.inputType);
    if(element.scrollHeight > element.clientHeight && elem.inputType !== "deleteContentBackward"){
      rows = rows + 2;
      console.log('increasing');
    }
    // else if(element.scrollHeight <= element.clientHeight && rows > 3 && elem.inputType === "deleteContentBackward"){
    //   rows = rows - 2;
    //   console.log('decreasing');
    // }
    element.setAttribute("rows", `${rows}`);
    // console.log('just resized');
  }

  moreEquipments(){
    this.equipments.push({val:""});
    this.equipments.push({val:""});
    this.equipments.push({val:""});
  }
  moreIngredients(){
    this.ingredients.push(new Ingredient("", "", 0, IngredientMeasure.Count, "", ""));
    this.ingredients.push(new Ingredient("", "", 0, IngredientMeasure.Count, "", ""));
    this.ingredients.push(new Ingredient("", "", 0, IngredientMeasure.Count, "", ""));
  }

  delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
}
