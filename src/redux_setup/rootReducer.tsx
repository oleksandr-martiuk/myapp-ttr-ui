import {combineReducers} from "redux";

import reportsReducers from "../components/TimeReports/redux/Reports/reports.reducers";
import sessionReducers from "../components/TimeReports/redux/Session/session.reducers";
import timeReducers from "../components/TimeReports/redux/Time/time.reducers";

export default combineReducers({
   reportState: reportsReducers,
   sessionState: sessionReducers,
   timeState: timeReducers
});
