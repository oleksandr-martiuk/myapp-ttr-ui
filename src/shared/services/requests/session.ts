import { GraphQlService } from "../graphql";

export interface ISessionOptions {
   time?: string;
   noteTime?: string;
}
interface ISession extends ISessionOptions {
   id?: string;
}

export class Session extends GraphQlService {
   sessionFields: string[];

   constructor() {
      super();
      this.sessionFields = ['id', 'time', 'noteTime', 'isStarted'];
   }

   public async createSession (params: ISessionOptions): Promise<ISession> {
      const options = {
         methodName: 'createSession',
         params,
         resFields: this.sessionFields,
      };

      return this.mutate(options);
   }

   public async getLastSession (): Promise<ISession> {
      const options = {
         methodName: 'readLastSession',
         resFields: this.sessionFields,
      };

      return this.query(options);
   }

   public async updateSession (params: {id: string}, updateOptions: ISessionOptions) {
      const options = {
         methodName: 'updateSession',
         params,
         update: updateOptions,
         resFields: this.sessionFields,
      };

      return this.mutate(options);
   }
}
