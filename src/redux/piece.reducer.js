import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import PieceService from '../services/piece.service';

const initialState = {
  loading: false,
  entities: [],
};

// Actions

export const getEntities = createAsyncThunk('piece/fetch', async () => {
  return await PieceService.getAll();
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
