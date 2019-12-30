import axios from 'axios';

interface IQeuryOptions {
   methodName: string;
   resFields: string[];
   params?: object;
   update?: object;
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
      return GraphQlService.sendRequest(query, options.methodName);
   }

   private static async sendRequest(query: object, methodName: string): Promise<object | object[] | null> {
      // @ts-ignore // TODO: should be fixed
      const result = await axios.post(process.env.REACT_APP_API_BASE_URL, query);
      if (!result) {
         return null;
      }

      return result.data.data[methodName];
   }

   private getQueryData (options: IGraphOptions): IQuery {
      const { queryType, methodName, resFields } = options;
      const queryParams = (options.params) ? this.getQueryParams(options) : "";

      return {
         query: `${queryType} { ${methodName} ${queryParams} { ${resFields.join(" ")} } }`
      };
   }

   private getQueryParams (options: IGraphOptions): string {
      const {queryType = '', params = null, update = null} = options;
      let updateStr = '';
      let paramsStr = '';

      if (update) {
         updateStr = `, update: { ${this.stringify(update)} }`;
      }

      if (params) {
         if (queryType === 'query') {
            paramsStr = '(' + this.stringify(params) + ')';
         } else if (queryType === 'mutation') {
            paramsStr = '( input: {' + this.stringify(params) + updateStr + '} )';
         }
      }

      return paramsStr;
   }

   private stringify (obj: any): string {
      const getWrappedValue = (value: any) => isNaN(value) ? `"${value}"` : value;

      return Object.keys(obj).map(key => `${key}:${getWrappedValue(obj[key])}`).join(", ");
   }
}
