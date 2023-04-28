import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosResponse } from "axios";

interface Article {
  author_name: string;
  article_id: string;
  title: string;
  body: string;
  description: string;
  category_name: string;
  created_at: string;
  main_image: string;
  publised_at: string;
  slug: string;
  tag: string;
  total: number;
  updated_at: string;
}
interface ApiResponse {
  data: Article[];
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
  data: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTranding = createAsyncThunk<Article[], number>(
  "articles/fetchTranding",
  async (limit: number) => {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles/list?offset=1&limit=${limit}`
    );
    return response.data.data;
  }
);

export const trandingSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranding.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTranding.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchTranding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching articles";
      });
  },
});

export default trandingSlice.reducer;
