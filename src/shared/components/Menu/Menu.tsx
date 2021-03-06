import React, {Component} from 'react';
import {connect} from "react-redux";
import {createSession, getLastSession} from "../../../components/TimeReports/redux/Session/session.services";
import {ISessionOptions} from "../../services/requests/session";
import {IMenuItem} from "./types/menu-item";
import {MENU_ITEMS} from "../../constants";
import {ITime} from "../../../components/TimeReports/redux/Time/types/time";
import {updateTimeAction} from "../../../components/TimeReports/redux/Time/time.actions";
import {withStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core/styles";
import {readReports} from "../../../components/TimeReports/redux/Reports/reports.services";

const menuBtnImg = require('../../images/menu_btn.png');

const styles = (theme: Theme): any => ({
   menuButton: {
      backgroundImage: `url(${menuBtnImg})`,
      position: 'fixed',
      backgroundPosition: '0 -1px',
      top: '10px',
      left: '10px',
      zIndex: 1,
      border: '1px solid #46a882',
      borderRadius: '3px',
      backgroundRepeat: 'no-repeat',
      color: '#FFFFFF',
      width: '39px',
      height: '38px',
      cursor: 'pointer',
      alignContent: 'center',
      '&:hover': {
         backgroundPosition: '0 -39.6px',
         boxShadow: '0 0 10px #60daaa',
      },
      '&:active': {
         backgroundPosition: '0 -78.5px',
         boxShadow: '0 0 10px #46a882',
      }
   },
   menuWindow: {
      position: 'fixed',
      top: '55px',
      left: '10px',
      zIndex: 100,
      border: '0.5px solid #46a882',
      borderRadius: '3px',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      width: '200px',
      alignContent: 'center',
      padding: '10px',
   },
   menuItem:{
      color: '#46a882',
      padding: '8px',
      cursor: 'pointer',
      "&:hover": {
         color: '#FFFFFF',
         textShadow: '0 0 10px #46a882',
      }
   }
});

class Menu extends Component<any, any> {
   constructor(props: any) {
      super(props);
      this.state = {
         onWindowShow: false,
         items: MENU_ITEMS
      }
   }

   public render() {
      const { classes } = this.props;
      const menuWindowHeight = (this.props.session && this.props.session.isRunning) ? "70px" : "105px";

      return (
         <>
            <div className={classes.menuButton} onClick={this.handleWindowClick}/>
            {(this.state.onWindowShow)
               ? <div className={classes.menuWindow} style={{height: menuWindowHeight}}>
                     {this.state.items.map((item: IMenuItem, index: number) => {
                        if (item.key === 'createSession' && this.props.session.isRunning) {
                           return null;
                        }
                        return (
                           <div className={classes.menuItem} key={item.key} onClick={() => this.handleItemClick(item.key)}>
                              {item.value}
                           </div>
                        );
                     })}
                 </div>
               : null
            }
         </>
      );
   }

   private handleWindowClick = () => {
      this.setState({ onWindowShow: !this.state.onWindowShow });
   };

   private handleItemClick = (key: string) => {
      if (key === 'createSession') {
         const sessionOptions = {
            time: process.env.REACT_APP_START_TIME,
            noteTime: process.env.REACT_APP_NOTE_TIME
         };

         this.props
            .onCreateSession(sessionOptions)
            .then(() => this.props.onGetLastSession())
            .then(() => this.props.onReadReports(this.props.session.id))
            .then(() => this.props.onUpdateTime(this.props.session.time));
      }
   }
}

const mapStateToProps = (state: any) => ({
   session: state.sessionState.session
});
const mapDispatchToProps = (dispatch: any) => ({
   onCreateSession: (sessionOptions: ISessionOptions) => createSession(dispatch, sessionOptions),
   onGetLastSession: () => getLastSession(dispatch),
   onReadReports: (sessionId: string) => readReports(dispatch, sessionId),
   onUpdateTime: (time: ITime) => dispatch(updateTimeAction(time))
});

export default connect (
   mapStateToProps,
   mapDispatchToProps
)(
   withStyles(styles, { withTheme: true })(Menu)
);
