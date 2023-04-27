import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosResponse } from 'axios';


interface Article {
  author_name: string;
  article_id: string;
  title: string;
  body: string;
  description:string
  category_name : string
  created_at: string
  main_image:string
  publised_at:string
  slug:string
  tag:string
  total:number
  updated_at:string
}

interface ApiResponse {
  data: Article;
  meta: {
    message: string;
    code: number;
    status: string;
  };
  recordsTotal: number;
  recordsFiltered: number;
  last_page: number;
}

interface ArticlesState {
  data: Article;
  loading: boolean;
  error: string | null;
}

const singleArticleState: ArticlesState = {
  data: {} as Article,
  loading: false,
  error: null,
};

export const fetchArticleByName = createAsyncThunk<Article, string>('articles/fetchArticleByName', async (article_id: string) => {
  const response: AxiosResponse<ApiResponse> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/${article_id}`);
  return response.data.data;
});
  

  export const articleSingle = createSlice({
    name: 'singleArticle',
    initialState: singleArticleState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchArticleByName.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchArticleByName.fulfilled, (state, action: PayloadAction<Article>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(fetchArticleByName.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Error fetching article';
        });
    },
  });
  
export default articleSingle.reducer;
