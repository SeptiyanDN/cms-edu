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
  publised_at: string;
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
  data: Article;
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  data: {} as Article,
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
    const { title, description, category_id,main_image,body } = args;
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/`,
      {
        title:title,
        description : description,
        category_id:category_id,
        main_image:main_image,
        body:body
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
      })
      .addCase(
        createArticle.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching articles";
      });
  },
});

export default create.reducer;
