import { IReport } from "./report";

export interface TimeReportsAction {
   type: string;
   payload: {
      reports: IReport[];
   };
}
