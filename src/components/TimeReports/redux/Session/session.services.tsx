import {ISessionOptions, Session} from "../../../../shared/services/requests/session";
import {createSessionAction, getLastSessionAction} from "./session.actions";

export const createSession = (dispatch: any, sessionOptions: ISessionOptions) => {
   console.log('3. SERVICE: createSession: ');
   const sessionService = new Session();

   return sessionService.createSession(sessionOptions)
      .then((session: any) => {
         console.log('4. sessionService.createSession: ===> createdSession: ', session);
         // TODO: dispatch of 'Create-session' should be upgraded by 'Read-session'
         return dispatch(createSessionAction(session));
      })
};

export const getLastSession = (dispatch: any) => {
   console.log('3. SERVICE: getLastSession: ');
   const sessionService = new Session();

   return sessionService.getLastSession()
      .then((session: any) => {
         return dispatch(getLastSessionAction(session));
      })
};
