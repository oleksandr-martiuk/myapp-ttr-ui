import {CREATE_REPORT, DELETE_REPORT, READ_REPORTS} from "./reports.actionTypes";
import {IReport} from "./types/report";

export const createReportAction = (report: IReport) => {
   console.log('5. REPORTS.actions: type ===> ', CREATE_REPORT);
   console.log('5. REPORTS.actions: payload ===> ', report);
   return {
      type: CREATE_REPORT,
      payload: report
   };
};

export const readReportsAction = (reports: IReport[]) => {
   console.log('5. REPORTS.actions: type ===> ', CREATE_REPORT);
   console.log('5. REPORTS.actions: payload ===> ', reports);
   return {
      type: READ_REPORTS,
      payload: reports
   };
};

export const deleteReportAction = (report: IReport[]) => {
   console.log('5. REPORTS.actions: type ===> ', DELETE_REPORT);
   console.log('5. REPORTS.actions: payload ===> ', report);
   return {
      type: DELETE_REPORT,
      payload: report
   };
};
