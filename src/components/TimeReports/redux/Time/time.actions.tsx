import { UPDATE_TIME } from "./time.actionTypes";
import {ITime} from "./types/time";

export const updateTimeAction = (time: ITime) => ({
   type: UPDATE_TIME,
   payload: time
});
