import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import ErrorService from '../services/error.service';

const initialState = {
  loading: false,
  entities: [],
};

// Actions

export const getEntities = createAsyncThunk('error/fetch', async () => {
  return await ErrorService.getAll();
});

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data } = action.payload;
        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(isRejected(getEntities), (state) => {
        state.loading = true;
      })

      .addMatcher(isPending(getEntities), (state) => {
        state.loading = true;
      });
  },
});

export default errorSlice.reducer;
