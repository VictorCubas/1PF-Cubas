import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";
import { Student } from "src/app/dashboard/pages/alumnos/models";

export const authFeatureKey = 'auth';
export interface AuthState {
  authUser: Student | null;
}

const initialState: AuthState = {
  authUser: null,
}

export const authReducer = createReducer(initialState,
  on(AuthActions.setAuthUser, (currentState, action) => {
    return {
      authUser: action.payload
    }
  })
)
