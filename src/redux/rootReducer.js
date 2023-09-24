import { combineReducers } from '@reduxjs/toolkit';
import piece from './piece.reducer';
import error from './error.reducer';

const rootReducer = combineReducers({
  piece,
  error,
});

export default rootReducer;
