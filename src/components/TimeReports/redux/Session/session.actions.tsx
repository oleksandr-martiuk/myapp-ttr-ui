import {CREATE_SESSION, GET_LAST_SESSION, UPDATE_SESSION} from "./session.actionTypes";
import {ISession} from "./types/session";

export const createSessionAction = (session: ISession) => ({
   type: CREATE_SESSION,
   payload: session
});

export const getLastSessionAction = (session: ISession) => ({
   type: GET_LAST_SESSION,
   payload: session
});

export const updateSessionAction = (session: ISession) => ({
   type: UPDATE_SESSION,
   payload: session
});
