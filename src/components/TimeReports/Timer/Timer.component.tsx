import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import {Button, Grid} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import {INTERVAL as _I, TIME_TURN, env} from "../../../shared/constants";
import {connect} from "react-redux";
import {createSession, getLastSession, updateSession} from "../redux/Session/session.services";
import {formatTime} from "../../../shared/pipes/format-time.pipe";
import {updateTimeAction} from "../redux/Time/time.actions";
import {ITime} from "../redux/Time/types/time";

const styles = (theme: Theme) => ({
   buttonBlock: {
      alignContent: 'center',
   },
   btn: {
      border: `1px solid ${theme.palette.text.primary}`,
      margin: theme.spacing(1, 0, 0 , 0),
      padding: theme.spacing(0.2, 1),
   },
   digits: {
      fontSize: '80px',
      height: '62px',
      lineHeight: '64px',
      display:'flex',
      justifyContent: 'center',
   },
   arrowBlock: {
      height: '20px',
      padding: '0 0 5px 0',
      zIndex: 1,
   },
   arrowDisabled: {
      color: theme.palette.text.disabled
   },
   arrow: {
      cursor: 'pointer',
      color: theme.palette.text.primary,
      '&:hover': {
         color: theme.palette.primary.main,
      },
      '&:active': {
         transform: 'scale(1.3)'
      },
   }
});

class Timer extends Component<any, any> {
   public timer: any;
   constructor(readonly props: any) {
      super(props);
      this.state = {
         start: 0,
         isRunning: false,
         btnName: 'Start',
         timer: { h: 0, m: 0, s: 0 }
      };
   }

   componentDidMount(): void {
      this.props
         .onGetLastSession()
         .then(() => this.props.onUpdateTime(this.props.session.time))
   }

   public render() {
      // styles
      const { classes } = this.props;
      const btnTextColor = (this.state.btnName === 'Start') ? "#60daaa" : "#B00020";
      const arrowStyle = (this.state.start) ? classes.arrowDisabled : classes.arrow;

      return (
         <div>
            <Grid container>

               <Grid container>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandLess className={arrowStyle} onClick={() => this.changeTime(_I.h.name, TIME_TURN.up)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandLess className={arrowStyle} onClick={() => this.changeTime(_I.m.name, TIME_TURN.up)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandLess className={arrowStyle} onClick={() => this.changeTime(_I.s.name, TIME_TURN.up)}/>
                  </Grid>
                  <Grid item xs={2}></Grid>
               </Grid>

               <Grid container>
                  <Grid item xs={2} className={classes.digits}></Grid>
                  <Grid item xs={2} className={classes.digits}>{formatTime(this.props.time).hour}</Grid>
                  <Grid item xs={1} className={classes.digits}>:</Grid>
                  <Grid item xs={2} className={classes.digits}>{formatTime(this.props.time).minute}</Grid>
                  <Grid item xs={1} className={classes.digits}>:</Grid>
                  <Grid item xs={2} className={classes.digits}>{formatTime(this.props.time).second}</Grid>
                  <Grid item xs={2} className={classes.digits}></Grid>
               </Grid>

               <Grid container>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}className={classes.arrowBlock}>
                     <ExpandMore className={arrowStyle} onClick={() => this.changeTime(_I.h.name, TIME_TURN.down)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandMore className={arrowStyle} onClick={() => this.changeTime(_I.m.name, TIME_TURN.down)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandMore className={arrowStyle} onClick={() => this.changeTime(_I.s.name, TIME_TURN.down)}/>
                  </Grid>
                  <Grid item xs={2}></Grid>
               </Grid>

               <Grid container>
                  <Grid item className={classes.buttonBlock} xs={12}>
                     <Button className={classes.btn} onClick={this.toggleTimer} style={{color: btnTextColor}}>
                        {this.state.btnName}
                     </Button>
                  </Grid>
               </Grid>

            </Grid>
         </div>
      );
   }

   private runTimer = () => {
      this.setState({
         start: Date.now() + this.props.time,
         isRunning: true,
         btnName: 'Stop',
      });
      this.timer = setInterval(() => {
         const time = this.state.start - Date.now();
         this.updateSessionTime(time);
         this.props.onUpdateTime(time);
      }, 1000);
   };

   private updateSessionTime (time: number): void {
      if (this.props.session.time - this.props.time >= env.REACT_APP_SESSION_UPDATE_TIME) {
         this.props.onUpdateSession(this.props.session.id, {time: this.props.time});
      }
   }

   private stopTimer = () => {
      this.setState({
         isRunning: false,
         btnName: 'Start',
      });
      clearInterval(this.timer);
   };

   private toggleTimer = () => (this.state.isRunning) ? this.stopTimer() : this.runTimer();

   private changeTime = (timeSegment = "", direction = "") => {
      if (this.state.start) {
         return;
      }

      let vary = 0;
      if (direction === TIME_TURN.up) {
         vary = 1;
      } else if (direction === TIME_TURN.down) {
         vary = -1;
      }

      let updatedTime = this.props.time;
      if (timeSegment === _I.h.name) {
         updatedTime += vary * (_I.m.max * _I.s.max * _I.ms.max);
      } else if (timeSegment === _I.m.name) {
         updatedTime += vary * (_I.s.max * _I.ms.max);
      } else if (timeSegment === _I.s.name) {
         updatedTime += vary * _I.ms.max;
      }

      if (updatedTime >= 0) {
         this.props.onUpdateTime({time: updatedTime});
      }
   };
}

const mapStateToProps = (state: any) => ({
   session: state.sessionState.session,
   time: state.timeState
});

const mapDispatchToProps = (dispatch: any) => ({
   onCreateSession: (sessionOptions: any) => createSession(dispatch, sessionOptions),
   onGetLastSession: () => getLastSession(dispatch),
   onUpdateSession: (id: string, updateSessionFields: any) => updateSession(dispatch, id, updateSessionFields),
   onUpdateTime: (time: ITime) => dispatch(updateTimeAction(time))
});

export default connect (
   mapStateToProps,
   mapDispatchToProps
)(
   withStyles(styles, { withTheme: true })(Timer)
);
