import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import rootReducer from './rootReducer';

export default function configureStore(initialState: any) {
   return createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk))
   );
}
