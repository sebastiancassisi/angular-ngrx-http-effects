import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';

@Injectable()
export class UsuarioEffects {
    constructor(private actions$: Actions, private usuariosService: UsuarioService) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(cargarUsuario),
            mergeMap(
                (action) => this.usuariosService.getUserById(action.id)
                    .pipe(
                        map(user => cargarUsuarioSuccess({ usuario: user })),
                        catchError(err => of(cargarUsuarioError({ payload: err })))
                    )
            )
        )
    );

}