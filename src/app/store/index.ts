import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authFeatureKey, authReducer } from "./auth.actions.ts/auth.reducer";

export interface AppState {
  [authFeatureKey]: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [authFeatureKey]: authReducer,
}
