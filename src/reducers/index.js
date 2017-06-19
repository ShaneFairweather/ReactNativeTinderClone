import { combineReducers } from 'redux';
import InitialReducer from './CardReducer';

export default combineReducers({
    initial: InitialReducer
});