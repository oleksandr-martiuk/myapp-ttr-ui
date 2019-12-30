import {CREATE_REPORT, READ_REPORTS, DELETE_REPORT} from "./reports.actionTypes";
import {IReport} from "./types/report";

interface IReportAction {
   type: string;
   payload: IReport
}

const initialState = {
   reports: []
};

const reportsReducers = (state = initialState, action: IReportAction) => {
   switch (action.type) {
      case CREATE_REPORT:
         return {
            ...state,
            reports: [...state.reports, action.payload]
         };
      case READ_REPORTS:
         return {
            ...state,
            reports: action.payload
         };
      case DELETE_REPORT:
         return {
            ...state,
            reports: state.reports.filter((report: IReport) => report.id !== action.payload.id)
         };
      default:
         return state;
   }
};

export default reportsReducers;
