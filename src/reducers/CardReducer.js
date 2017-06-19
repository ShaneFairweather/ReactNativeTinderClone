import { INITIAL_REDUCER } from '../actions/actions_types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INITIAL_REDUCER:
            return state;
        default:
            return state;
    }
}