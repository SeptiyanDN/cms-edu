import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosResponse } from "axios";

interface Article {
  article_id: string;
  title: string;
  description: string;
  body: string;
  slug: string;
  category_id: string;
  author_id: string;
  main_image: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  status: number;
}

interface ApiResponse {
  data: Article;
  meta: {
    message: string;
    code: number;
    status: string;
  };
}

interface ArticlesState {
  data: Article | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  data: null,
  loading: false,
  error: null,
};

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (args: {
    title: string;
    description: string;
    category_id: string;
    main_image: string;
    body: string;
  }) => {
    const { title, description, category_id, main_image, body } = args;
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/`,
      {
        title,
        description,
        category_id,
        main_image,
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  }
);

export const create = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createArticle.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error creating article";
      });
  },
});

export default create.reducer;
