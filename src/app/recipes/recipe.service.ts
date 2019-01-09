import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [new Recipe('Schnitzel','This is a tasty homemade schnitzel.',
        'https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2016/10/12/Food/Images/PorkSchnitzel-93591476292525.jpg?t=20170517',
        [new Ingredient('Meat', 1), new Ingredient('French Fries', 19)]),
        new Recipe('Cheeseburger',
        'This is a fat burger.',
        'https://i.kinja-img.com/gawker-media/image/upload/s--l6rS3nZj--/c_scale,f_auto,fl_progressive,q_80,w_800/vcwkkj2ayw6eez1rbwdt.jpg',
        [new Ingredient('Cheese', 1), new Ingredient('Buns', 2)])
    ];

    constructor(private slService: ShoppingListService) {}
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingrdients: Ingredient[]) {
        this.slService.addIngredients(ingrdients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    
}
