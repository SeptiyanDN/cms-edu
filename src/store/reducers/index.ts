import { combineReducers } from 'redux';
import articlesReducer from './articles/articlesSlice';
import articleSingleReducer from './articles/article'
import createArticleReducer from './articles/create'
import articleByTagReducer from './articles/searchByTag'
import trandingReducer from './articles/fetchTrending'
import categoriesReducer from './category/categories'

const rootReducer = combineReducers({
  articles: articlesReducer,
  article : articleSingleReducer,
  categories : categoriesReducer,
  tranding : trandingReducer,
  articleByTag :articleByTagReducer,
  createArticle : createArticleReducer
});

export default rootReducer;
