import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

function my(state = null, action) {
    return state;
}

export const store = createStore(
    combineReducers({ my }),
    applyMiddleware(thunk)
);
