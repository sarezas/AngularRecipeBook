import { Component, OnInit } from '@angular/core';
import { firebase } from '@firebase/app';

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
      apiKey: 'AIzaSyAdrU3segi4D0fK-A--wpM7tK-NibzSvfo',
      authDomain: 'recipes-ng-sharis.firebaseapp.com'
    });
  }
}
