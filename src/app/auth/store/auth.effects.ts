import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) {}

    @Effect()
    authSignup = this.actions$
    // catches a specific effect of the given type
    .pipe(ofType(AuthActions.TRY_SIGNUP))
    .pipe(
        map((action: AuthActions.TrySignup) => {
            return action.payload;
        }),
        switchMap((authData: {username: string, password: string}) => {
            // returns observable from a promise coming from the DB
            // creates a user in the DB
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            // again observable from a promise coming from the DB
            // gets the token from the DB
            return from(firebase.auth().currentUser.getIdToken());
            }),
        // merges two objects and maps them into a single observable actions SIGNUP and SET_TOKEN, with the actual token
        mergeMap((token: string) => {
            // router navigation can be added here also
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    @Effect()
    authSignin = this.actions$
    .pipe(ofType(AuthActions.TRY_SIGNIN))
    .pipe(
        map((action: AuthActions.TrySignin) => {
            return action.payload;
        }),
        switchMap((authData: {username: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            // router navigation can be added here also
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$
    .pipe(ofType(AuthActions.LOGOUT))
    .pipe(tap(() => {
        this.router.navigate(['/']);
    }));
}
