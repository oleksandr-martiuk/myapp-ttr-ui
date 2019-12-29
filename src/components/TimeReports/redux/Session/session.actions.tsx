import {CREATE_SESSION, GET_LAST_SESSION} from "./session.actionTypes";
import {ISession} from "./types/session";

export const createSessionAction = (session: ISession) => {
   console.log('5. SESSION.actions: type ===> ', CREATE_SESSION);
   console.log('5. SESSION.actions: payload ===> ', session);
   return {
      type: CREATE_SESSION,
      payload: session
   };
};

export const getLastSessionAction = (session: ISession) => {
   console.log('5. SESSION.actions: type ===> ', GET_LAST_SESSION);
   console.log('5. SESSION.actions: payload ===> ', session);
   return {
      type: GET_LAST_SESSION,
      payload: session
   }
};
