import { GraphQlService } from "../graphql";

export interface ISessionOptions {
   time: string;
   noteTime: string;
}
interface ISession extends ISessionOptions {
   id?: string;
}

export class Session extends GraphQlService {
   sessionFields: string[];

   constructor() {
      super();
      this.sessionFields = ['id', 'time', 'noteTime'];
   }

   public async createSession (params: ISessionOptions, resFields?: string[]): Promise<ISession> {
      const options = {
         methodName: 'createSession',
         resFields: (resFields) ? resFields : this.sessionFields,
         params
      };

      return this.mutate(options);
   }

   public async getLastSession (resFields?: string[]): Promise<ISession> {
      const options = {
         methodName: 'readLastSession',
         resFields: (resFields) ? resFields : this.sessionFields
      };

      return this.query(options);
   }
}
