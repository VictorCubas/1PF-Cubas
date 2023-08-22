import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Student } from "src/app/dashboard/pages/alumnos/models";


export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    // Establecer usuario autenticado
    'set auth user': props<{ payload: Student | null }>()
  }
})
