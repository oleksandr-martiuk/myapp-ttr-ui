import { createMuiTheme } from '@material-ui/core/styles';

export const appTheme = createMuiTheme({
   palette: {
      primary: {
         main: '#60daaa',
         dark: '#1e855a'
      },
      secondary: {
         main: '#B00020'
      },
      background: {
         default: '#000000',
         paper: "#0e0e0e"
      },
      text: {
         primary: '#FFFFFF',
         secondary: '#8D8D8D',
         disabled: '#3A3A3A'
      },
   },
});
