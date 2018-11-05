import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { Recipe, Ingredient, IngredientMeasure, Stage, Step, RecipeDescription } from "../models/Recipe";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RecipeService {
    constructor(private authService: AuthService){}

    getRecipeById(id: string): Observable<Recipe> {
        return Observable.of(this.recipe);
    }

    private recipe: Recipe = new Recipe("the-real-recipe",
        "Zaheer's Chicken", new RecipeDescription(
            Array.of("https://images-gmi-pmc.edge-generalmills.com/8a61d4b7-8967-47f0-b486-71a0e86ca82a.jpg", "https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/200610-r-xl-wine-baked-chicken-legs-with-marjoram.jpg?itok=8SJ2jlod"),
            "1hr", "2 regular-sized people", "4 meals", Array.of("Chicken", "Desi", "Awesome"),
            "Enjoy this delicious recipe of chilli-lime, and tikka-masala marinated chicken baked in the oven to a juicy texture. Add it to salad, or over rice!"
        ),
        Array.of(
            new Ingredient("chicken", "www.chicken.com", 1, IngredientMeasure.Count, 
            "Real good chicken", "extraChicken"),
            new Ingredient("Spices", "www.spices.com", 10, IngredientMeasure.Tablespoon, 
            "Real good spices", "extraSpices")),
        Array.of("Pan", "Oven", "Fridge", "Shears"),
        Array.of(
            new Stage("test",
                Array.of(new Step("Buy the chicken"), new Step("Clean the chicken"))),
            new Stage("test1",
                Array.of(new Step("Marinate the chicken for a day"))
            )),
        Array.of(
            new Stage("test2",
                Array.of(new Step("Cut the chicken into pieces"),
                        new Step("Skewer on metal skewers"),
                        new Step("Bake at 325 for 10 mins"))
            )),
            "Zaheer",
            "Learned it from Sultan!"            
        );
    
    getRecipesForUser(): Observable<Array<Recipe>> {
        //var currentUser = this.authService.currentUser;
        console.log(JSON.stringify(this.recipe));
        return Observable.of(Array.of(this.recipe));
    }
}