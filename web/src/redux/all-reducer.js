import { combineReducers } from 'redux';
import tripReducer from './trip/reducer';

const allReducer = combineReducers({ tripReducer });

export default allReducer;
