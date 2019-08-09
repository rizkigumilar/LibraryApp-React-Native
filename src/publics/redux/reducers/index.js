import { combineReducers } from 'redux';

import book from './book'
import borrow from './borrow'
import user from './user'
import page from './page'

const appReducer = combineReducers({
  book,
  borrow,
  user,
  page
});

export default appReducer;
