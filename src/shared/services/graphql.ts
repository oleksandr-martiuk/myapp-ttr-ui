import axios from 'axios';

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
      console.log(query);
      // @ts-ignore // TODO: should be fixed
      const result = await axios.post(process.env.REACT_APP_API_BASE_URL, query);
      if (!result) {
         return null;
      }

      console.log('GraphQL: RESULT ===> ', result);

      return result.data.data[methodName];
   }

   private getQueryData (options: IGraphOptions): IQuery {
      const { queryType, methodName, resFields } = options;
      const queryParams = (options.params) ? this.getQueryParams(queryType, options.params) : "";

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
