import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";

import { rootReducer as reducer } from "./reducers";

const middleware = [...getDefaultMiddleware({ serializableCheck: false })];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
