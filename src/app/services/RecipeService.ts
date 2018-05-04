import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { Recipe, Ingredient, IngredientMeasure, Stage, Step, RecipeDescription } from "../models/DisplayRecipe";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RecipeService {
    constructor(private authService: AuthService){}
    
    getRecipesForUser(): Observable<Array<Recipe>> {
        //var currentUser = this.authService.currentUser;
        return Observable.of(Array.of(new Recipe(
            "Zaheer's Chicken", new RecipeDescription(
                Array.of("zaheersChicken1.jpg", "ZaheersChicken2.jpg"),
                "1hr", "2 regular-sized people", "4 meals", Array.of("Chicken", "Desi", "Awesome")
            ),
            Array.of(
                new Ingredient("chicken", "www.chicken.com", 1, IngredientMeasure.Count, 
                "Real good chicken", "extraChicken"),
                new Ingredient("Spices", "www.spices.com", 10, IngredientMeasure.Tablespoon, 
                "Real good spices", "extraSpices")),
            Array.of("Pan", "Oven", "Fridge", "Shears"),
            Array.of(
                new Stage(
                    Array.of(new Step("Buy the chicken"), new Step("Clean the chicken"))),
                new Stage(
                    Array.of(new Step("Marinate the chicken for a day"))
                )),
            Array.of(
                new Stage(
                    Array.of(new Step("Cut the chicken into pieces"),
                            new Step("Skewer on metal skewers"),
                            new Step("Bake at 325 for 10 mins"))
                )),
                "Zaheer",
                "Learned it from Sultan!"            
        )));
    }
}