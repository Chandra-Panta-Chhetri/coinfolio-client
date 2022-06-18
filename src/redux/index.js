import createSagaMiddleware from "redux-saga";
import rootReducer from "./root.reducer";
import rootSaga from "./root.saga";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["preferences"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
