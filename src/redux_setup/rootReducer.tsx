import {combineReducers} from "redux";

import reportsReducers from "../components/TimeReports/redux/Reports/reports.reducers";
import sessionReducers from "../components/TimeReports/redux/Session/session.reducers";

export default combineReducers({
   reportsReducers,
   sessionReducers
});
