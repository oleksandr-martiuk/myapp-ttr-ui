import {CREATE_REPORT, DELETE_REPORT, READ_REPORTS} from "./reports.actionTypes";
import {IReport} from "./types/report";

export const createReportAction = (report: IReport) => ({
   type: CREATE_REPORT,
   payload: report
});

export const readReportsAction = (reports: IReport[]) => ({
   type: READ_REPORTS,
   payload: reports
});

export const deleteReportAction = (report: IReport[]) => ({
   type: DELETE_REPORT,
   payload: report
});
