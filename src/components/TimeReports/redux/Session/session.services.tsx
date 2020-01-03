import {ISessionOptions, Session} from "../../../../shared/services/requests/session";
import {createSessionAction, getLastSessionAction, updateSessionAction} from "./session.actions";

export const createSession = (dispatch: any, sessionOptions: ISessionOptions) => {
   const sessionService = new Session();

   return sessionService.createSession(sessionOptions)
      .then((session: any) => dispatch(createSessionAction(session)))
};

export const getLastSession = (dispatch: any) => {
   const sessionService = new Session();

   return sessionService.getLastSession()
      .then((session: any) => dispatch(getLastSessionAction(session)));
};

export const updateSession = (dispatch: any, id: string, updateFields: object) => {
   const sessionService = new Session();

   return sessionService.updateSession({id}, updateFields)
      .then((session: any) => dispatch(updateSessionAction(session)));
};

// const sessionService = new Session();
//
// export const createSession = (dispatch: any, sessionOptions: ISessionOptions) => (
//    sessionService
//    .createSession(sessionOptions)
//    .then((session: any) => dispatch(createSessionAction(session)))
// );
//
// export const getLastSession = (dispatch: any) => (
//    sessionService
//    .getLastSession()
//    .then((session: any) => dispatch(getLastSessionAction(session)))
// );
//
// export const updateSession = (dispatch: any, id: string, updateFields: object) => (
//    sessionService
//    .updateSession({id}, updateFields)
//    .then((session: any) => dispatch(updateSessionAction(session)))
// );
