import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipes';
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'removed for safety reasons',
      authDomain: 'recipes-ng-sharis.firebaseapp.com'
    });
  }

  onNavigate(link: string) {
    this.loadedFeature = link;
  }
}
