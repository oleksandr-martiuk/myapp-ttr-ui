import {UPDATE_TIME} from "./time.actionTypes";

interface ITimeAction {
   type: string;
   payload: number;
}

const initialState = {
   time: 0
};

const timeReducers = (state = initialState, action: ITimeAction) => {
   switch (action.type) {
      case UPDATE_TIME:
         return action.payload;
      default:
         return state;
   }
};

export default timeReducers;
