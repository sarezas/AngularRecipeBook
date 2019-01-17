import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        // optional: send a put request with a third argument to set headers
        // const headers = new HttpHeaders().set('Authorization', 'Bearer sharism');
        // return this.httpClient.put('https://recipes-ng-sharis.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //         observe: 'body',
                // gives the result of 'https://recipes-ng-sharis.firebaseio.com/recipes.json?auth=' + token
                // params: new HttpParams().set('auth', token)
                // headers: headers
            // });

        const request = new HttpRequest('PUT', 'https://recipes-ng-sharis.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(), {
                reportProgress: true
            });
        return this.httpClient.request(request);
    }

    fetchRecipes() {
        this.httpClient.get<Recipe[]>('https://recipes-ng-sharis.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
        })
        .map((recipes) => {
            console.log(recipes);
            for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return recipes;
        })
        .subscribe((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
            }
        );
    }
}
