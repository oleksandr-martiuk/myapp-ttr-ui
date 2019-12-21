import React from 'react';
import {Route, Switch} from "react-router-dom";

import TimeTracker from "./TimeTracker/TimeTracker";
import {ThemeProvider} from "@material-ui/core";
import {appTheme} from "../shared/styles/theme";

const App = () => (
   <ThemeProvider theme={appTheme}>
      <div>
         <Switch>
            <Route exact={true} path="/" component={TimeTracker}/>
            <Route render={() => (<h1>Not FOUND!</h1>)}/>
         </Switch>
      </div>
   </ThemeProvider>
);

export default App;
