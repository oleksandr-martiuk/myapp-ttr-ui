import {CREATE_SESSION, GET_LAST_SESSION, UPDATE_SESSION} from "./session.actionTypes";
import {ISession} from "./types/session";

interface ISessionAction {
   type: string;
   payload: ISession
}

const initialState = {
   session: null
};

const sessionReducers = (state = initialState, action: ISessionAction) => {
   switch (action.type) {
      case CREATE_SESSION:
         return {
            session: action.payload
         };
      case GET_LAST_SESSION:
         return {
            session: action.payload
         };
      case UPDATE_SESSION:
         return {
            session: action.payload
         };
      default:
         return state;
   }
};

export default sessionReducers;
