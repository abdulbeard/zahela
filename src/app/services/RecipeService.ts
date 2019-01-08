import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { Recipe, Ingredient, IngredientMeasure, Stage, Step, RecipeDescription } from "../models/Recipe";
import { Observable } from "rxjs/Observable";
import { UserSessionService } from "./UserSessionService";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class RecipeService {
    constructor(private authService: AuthService, private httpClient: HttpClient){}

    public setTestRecipe(recipe: Recipe){
        localStorage.removeItem("testRecipe");
        localStorage.setItem("testRecipe", JSON.stringify(recipe));
        //this.testRecipe = recipe;
        //UserSessionService.setWorkingRecipe(recipe);
    }

    private getTestRecipe(): Recipe {
        var localStorageItem = localStorage.getItem("testRecipe");
        if (localStorageItem) {
            var recipe = Recipe.fromJson(localStorageItem);
            console.log(recipe);
            return recipe;
        }
        return null;
    }

    createRecipe(recipe: Recipe): Observable<Recipe> {
        console.log(environment);
        return this.httpClient.post<Recipe>(`${environment.backendUrl}/recipe`, recipe);
    }

    updateRecipe(recipe: Recipe) : Observable<Recipe> {
        console.log(environment);
        return this.httpClient.put<Recipe>(`${environment.backendUrl}/recipe`, recipe);
    }

    getRecipeById(id: string): Promise<Recipe> {
        var testRecipe = this.getTestRecipe();
        console.log(id, testRecipe);
        if((testRecipe) 
            && (id === testRecipe.Id)){
            return Observable.of(testRecipe).toPromise();
        }
        else {
            return this.httpClient.get<Recipe>(`${environment.backendUrl}/recipe/${id}`).toPromise().then(x => {
                var ingredients = <Array<Ingredient>> x["ingredients"];
                ingredients = ingredients.map(y => new Ingredient(y["name"], y["url"], y["amount"], y["measure"], y["description"], y["extraInfo"]));
                
                var rawDesc = x["description"];
                var desc = new RecipeDescription(rawDesc["images"], rawDesc["preparationTime"], rawDesc["servesHowMany"], rawDesc["portionSize"], rawDesc["tags"], rawDesc["text"]);

                var rawPrep = <Array<Stage>> x["preparation"];
                var rawCook = <Array<Stage>> x["actualCooking"];

                rawPrep = rawPrep.map(x => new Stage(x["name"], (<Array<Step>> x["steps"]).map(y => new Step(y["instructions"]))));
                rawCook = rawCook.map(x => new Stage(x["name"], (<Array<Step>> x["steps"]).map(y => new Step(y["instructions"]))));

                console.log(rawPrep, rawCook);

                var recipe = new Recipe(x["id"], 
                        x["name"], 
                        desc, 
                        ingredients, 
                        x["equipmentNeeded"], 
                        rawPrep, 
                        rawCook, 
                        x["sourceUserId"], 
                        x["origin"],
                        x["realId"]
                    );
                    console.log(x, recipe);
                    return recipe;
            });
            //return Observable.of(this.recipe); 
        }
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
    
    getRecipesForUser(): Promise<Array<Recipe>> {
        //var currentUser = this.authService.currentUser;
        console.log(JSON.stringify(this.recipe));
        return this.httpClient.get<Array<Recipe>>(`${environment.backendUrl}/recipe/all`).toPromise().then(x => {
            return x.map(x => this.parseRecipe(x));
        });
        //return Observable.of(Array.of(this.recipe)).toPromise();
    }

    private parseRecipe(recipe: any) : Recipe {
        var ingredients = <Array<Ingredient>> recipe["ingredients"];
        ingredients = ingredients.map(y => new Ingredient(y["name"], y["url"], y["amount"], y["measure"], y["description"], y["extraInfo"]));
        
        var rawDesc = recipe["description"];
        var desc = new RecipeDescription(rawDesc["images"], rawDesc["preparationTime"], rawDesc["servesHowMany"], rawDesc["portionSize"], rawDesc["tags"], rawDesc["text"]);

        var rawPrep = <Array<Stage>> recipe["preparation"];
        var rawCook = <Array<Stage>> recipe["actualCooking"];

        rawPrep = rawPrep.map(x => new Stage(x["name"], (<Array<Step>> x["steps"]).map(y => new Step(y["instructions"]))));
        rawCook = rawCook.map(x => new Stage(x["name"], (<Array<Step>> x["steps"]).map(y => new Step(y["instructions"]))));

        console.log(rawPrep, rawCook);

        return new Recipe(recipe["id"], 
                recipe["name"], 
                desc, 
                ingredients, 
                recipe["equipmentNeeded"], 
                rawPrep, 
                rawCook, 
                recipe["sourceUserId"], 
                recipe["origin"]
            );
    }
}