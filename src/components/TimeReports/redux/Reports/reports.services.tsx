import { IReport } from "./types/report";
import {createReportAction, deleteReportAction, readReportsAction} from "./reports.actions";
import {IReportOptions, Reports} from "../../../../shared/services/requests/reports";

export const createReport = (dispatch: any, reportOptions: IReportOptions) => {
   console.log('3. SERVICE: createReport ===> reportOptions: ', JSON.stringify(reportOptions));
   const reportsService = new Reports();

   return reportsService.createReport(reportOptions)
      .then((createdReport: any) => {
         console.log('4. reports.createReport: ===> createdReport: ', createdReport);
         return dispatch(createReportAction(createdReport));
      })
};

export const readReports = (dispatch: any, sessionId: string) => {
   console.log('3. SERVICE: readReports ===> sessionId: ', sessionId);
   const reportsService = new Reports();

   return reportsService.readReportsBySession(sessionId)
      .then((reports: any) => {
         console.log('4. reports.readReportsBySession: ===> reports: ', reports);
         return dispatch(readReportsAction(reports));
      })
};

export const deleteReport = (dispatch: any, id: string) => {
   console.log('3. SERVICE: deleteReport ===> id: ', id);
   const reportsService = new Reports();

   return reportsService.deleteReport(id)
      .then((reports: any) => {
         console.log('4. reports.deleteReportAction: ===> reports: ', reports);
         return dispatch(deleteReportAction(reports));
      })
};
