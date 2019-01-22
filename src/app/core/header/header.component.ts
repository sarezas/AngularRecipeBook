import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/dataStorage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveRecipes() {
    this.dataStorage.storeRecipes().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  onFetchRecipes() {
    this.dataStorage.fetchRecipes();
  }

  onLogout() {
    this.authService.logOut();
  }
}
