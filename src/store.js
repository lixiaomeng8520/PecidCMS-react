import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

function token(state = '', action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.payload;
        default:
            return state;
    }
}

export default createStore(combineReducers({ token }), applyMiddleware(thunk));
