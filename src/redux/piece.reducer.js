import axios from 'axios';
import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import Config from '../utils/config';

const initialState = {
  loading: false,
  entities: [],
};

// Actions

export const getEntities = createAsyncThunk('piece/fetch', async () => {
  return await axios.get(Config.API_GET_PIECES);
});

export const pieceSlice = createSlice({
  name: 'piece',
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

export default pieceSlice.reducer;
