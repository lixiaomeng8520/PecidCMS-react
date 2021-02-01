import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

function my(state = null, action) {
    switch (action.type) {
        case 'SET_MY':
            return action.payload;
        default:
            return state;
    }
}

export default createStore(combineReducers({ my }), applyMiddleware(thunk));
