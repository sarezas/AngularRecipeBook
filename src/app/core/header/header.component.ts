import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/dataStorage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorage: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  ngOnInit() {
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

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
