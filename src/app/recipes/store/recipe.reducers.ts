import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface RecipeState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Schnitzel',
        'This is a tasty homemade schnitzel.',
'https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2016/10/12/Food/Images/PorkSchnitzel-93591476292525.jpg?t=20170517',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 19)
        ]),
        new Recipe('Cheeseburger',
        'This is a fat burger.',
        'https://i.kinja-img.com/gawker-media/image/upload/s--l6rS3nZj--/c_scale,f_auto,fl_progressive,q_80,w_800/vcwkkj2ayw6eez1rbwdt.jpg',
        [
            new Ingredient('Cheese', 1),
            new Ingredient('Buns', 2)
        ])
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}
