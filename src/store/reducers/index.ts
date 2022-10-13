import { combineReducers } from "redux";

import { reducer as board } from "./board";

export const rootReducer = combineReducers({
  board,
});

export type RootState = ReturnType<typeof rootReducer>;
