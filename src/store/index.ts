import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import articlesReducer from './reducers/articles/articlesSlice';
import articleReducer from './reducers/articles/article';
import createArticleReducer from './reducers/articles/create';
import articleByTagReducer from './reducers/articles/searchByTag'
import trandingReducer from './reducers/articles/fetchTrending';
import categoriesReducer from './reducers/category/categories'
import thunkMiddleware from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    articles: articlesReducer,
    article: articleReducer,
    categories : categoriesReducer,
    tranding :trandingReducer,
    articleByTag :articleByTagReducer,
  createArticle : createArticleReducer


  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(thunkMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
