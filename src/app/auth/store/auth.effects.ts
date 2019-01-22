import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
    // catches a specific effect of the given type
    .pipe(ofType(AuthActions.TRY_SIGNUP))
    .pipe(map((action: AuthActions.TrySignup) => {
        return action.payload;
    }))
    .pipe(switchMap((authData: {username: string, password: string}) => {
        // returns observable from a promise coming from the DB
        // creates a user in the DB
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }))
    .pipe(switchMap(() => {
        // again observable from a promise coming from the DB
        // gets the token from the DB
        return from(firebase.auth().currentUser.getIdToken());
    }))
    // merges two objects and maps them into a single observable actions SIGNUP and SET_TOKEN, with the actual token
    .pipe(mergeMap((token: string) => {
        return [
            {
                type: AuthActions.SIGNUP
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
        ];
    }));

    constructor(private actions$: Actions) {}
}
