import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import TimeReports from "./TimeReports/TimeReports.component";
import {ThemeProvider} from "@material-ui/core";
import {appTheme} from "../shared/styles/theme";

const App = () => (
   <Router>
      <ThemeProvider theme={appTheme}>
         <div>
            <Switch>
               <Route exact={true} path="/" component={TimeReports}/>
               <Route render={() => (<h1>Not FOUND!</h1>)}/>
            </Switch>
         </div>
      </ThemeProvider>
   </Router>
);

export default App;
