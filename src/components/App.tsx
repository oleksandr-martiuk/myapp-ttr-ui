import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import TimeTracker from "./TimeTracker/TimeTracker";
import {ThemeProvider} from "@material-ui/core";
import {appTheme} from "../shared/styles/theme";

const App = () => (
   <Router>
      <ThemeProvider theme={appTheme}>
         <div>
            <Switch>
               <Route exact={true} path="/" component={TimeTracker}/>
               <Route render={() => (<h1>Not FOUND!</h1>)}/>
            </Switch>
         </div>
      </ThemeProvider>
   </Router>
);

export default App;
