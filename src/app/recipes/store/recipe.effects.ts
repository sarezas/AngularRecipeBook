import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromRecipe.RecipeState>) {}

    @Effect()
    recipeFetch = this.actions$
        .pipe(ofType(RecipeActions.FETCH_RECIPES))
        .pipe(
            switchMap((action: RecipeActions.FetchRecipes) => {
                return this.httpClient.get<Recipe[]>('https://recipes-ng-sharis.firebaseio.com/recipes.json', {
                    observe: 'body',
                    responseType: 'json'
                });
            }),
            map((recipes) => {
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                    };
            })
        );

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .pipe(ofType(RecipeActions.STORE_RECIPES))
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://recipes-ng-sharis.firebaseio.com/recipes.json',
                    state.recipes, {reportProgress: true});
                    return this.httpClient.request(request);
            })
        );
}
