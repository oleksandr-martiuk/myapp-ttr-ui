import { GraphQlService } from "../graphql";

export interface IReportOptions {
   sessionId: string;
   description: string;
}
interface IReport extends IReportOptions {
   id?: string;
}

export class Reports extends GraphQlService {
   reportFields: string[];

   constructor() {
      super();
      this.reportFields = ['id', 'sessionId', 'description'];
   }

   public async createReport (params: IReportOptions, resFields?: string[]): Promise<IReport[]> {
      const options = {
         methodName: 'createReport',
         resFields: (resFields) ? resFields : this.reportFields,
         params
      };

      return this.mutate(options);
   }

   public async readReportsBySession (sessionId: string, resFields?: string[]): Promise<IReport[]> {
      const options = {
         methodName: 'readSessionReports',
         resFields: (resFields) ? resFields : this.reportFields,
         params: { sessionId }
      };

      return this.query(options);
   }

   public async deleteReport (id: string, resFields?: string[]): Promise<IReport[]> {
      const options = {
         methodName: 'deleteReport',
         resFields: (resFields) ? resFields : this.reportFields,
         params: { id }
      };

      return this.query(options);
   }
}
