import { combineReducers } from '@reduxjs/toolkit';
import piece from './piece.reducer';

const rootReducer = combineReducers({
  piece,
});

export default rootReducer;
