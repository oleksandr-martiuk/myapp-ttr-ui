import {createReportAction, deleteReportAction, readReportsAction} from "./reports.actions";
import {IReportOptions, Reports} from "../../../../shared/services/requests/reports";

export const createReport = (dispatch: any, reportOptions: IReportOptions) => {
   const reportsService = new Reports();
   return reportsService.createReport(reportOptions)
      .then((createdReport: any) => dispatch(createReportAction(createdReport)));
};

export const readReports = (dispatch: any, sessionId: string) => {
   const reportsService = new Reports();
   return reportsService.readReportsBySession(sessionId)
      .then((reports: any) => dispatch(readReportsAction(reports)));
};

export const deleteReport = (dispatch: any, id: string) => {
   const reportsService = new Reports();
   return reportsService.deleteReport(id)
      .then((reports: any) => dispatch(deleteReportAction(reports)));
};
