import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from 'redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

export default store;