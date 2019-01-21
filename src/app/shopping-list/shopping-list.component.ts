import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import * as fromShoppingList from './ngRx-store/shopping-list.reducers';
import * as ShoppingListActions from './ngRx-store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
