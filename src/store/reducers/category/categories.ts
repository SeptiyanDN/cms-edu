import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosResponse } from 'axios';


interface Category {
    business_name: string;
    category_id: string;
    category_name: string;
    is_active: boolean;
    service_name:string
    tag : string
    total: number
}
interface ApiResponse {
  data: Category[];
  meta: {
    message: string;
    code: number;
    status: string;
  };
  recordsTotal: number;
  recordsFiltered: number;
  last_page: number;
}

interface CategoriesState {
  data: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[], void>('categories/fetchCategories', async () => {
  const response: AxiosResponse<ApiResponse> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories/list`);
  return response.data.data;
});

export const categorySlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching articles';
      });
  },
});

export default categorySlice.reducer;
