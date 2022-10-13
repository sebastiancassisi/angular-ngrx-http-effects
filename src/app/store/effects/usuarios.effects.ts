import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions, private usuariosService: UsuarioService) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(cargarUsuarios),
            mergeMap(
                () => this.usuariosService.getUsers()
                    .pipe(
                        map(users => cargarUsuariosSuccess({ usuarios: users })),
                        catchError(err => of(cargarUsuariosError({ payload: err })))
                    )
            )
        )
    );

}