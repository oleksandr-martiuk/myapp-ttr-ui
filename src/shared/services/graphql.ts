import axios from 'axios';
import { env } from '../../environments/environment';

interface IQeuryOptions {
   methodName: string;
   resFields: string[];
   params?: object;
}
interface IGraphOptions extends IQeuryOptions {
   queryType: string;
}
interface IQuery {
   query: string;
}

export class GraphQlService {
   public async query (options: IQeuryOptions): Promise<any> {
      const query = this.getQueryData({...options, queryType: 'query'});
      return GraphQlService.sendRequest(query, options.methodName);
   }

   public async mutate (options: IQeuryOptions): Promise<any> {
      const query = this.getQueryData({...options, queryType: 'mutation'});
      console.log(query);

      return GraphQlService.sendRequest(query, options.methodName);
   }

   private static async sendRequest(query: object, methodName: string): Promise<object | object[] | null> {
      const result = await axios.post(env.API_BASE_URL, query);
      if (!result) {
         return null;
      }
      return result.data.data[methodName];
   }

   private getQueryData (options: IGraphOptions): IQuery {
      const { queryType, methodName, resFields, params } = options;
      const queryParams = this.getQueryParams(queryType, params);

      return {
         query: `${queryType} { ${methodName} ${queryParams} { ${resFields.join(" ")} } }`
      };
   }

   private getQueryParams (queryType: string, params?: object): string {
      let paramsStr = '';

      if (params) {
         if (queryType === 'query') {
            paramsStr = '(' + this.stringify(params) + ')';
         } else if (queryType === 'mutation') {
            paramsStr = '( input: {' + this.stringify(params) + '} )';
         }
      }

      return paramsStr;
   }

   private stringify (obj: any): string {
      const getWrappedValue = (value: any) => isNaN(value) ? `"${value}"` : value;

      return Object.keys(obj).map(key => `${key}:${getWrappedValue(obj[key])}`).join(", ");
   }
}
