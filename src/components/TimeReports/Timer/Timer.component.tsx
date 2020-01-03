import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import {Button, Grid} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import {INTERVAL as _I, TIME_TURN, env} from "../../../shared/constants";
import {connect} from "react-redux";
import {createSession, getLastSession, updateSession} from "../redux/Session/session.services";
import {formatTime} from "../../../shared/pipes/format-time.pipe";

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
         time: 0, // TODO: move 'time' to REDUX
         isOn: false,
         btnName: 'Start',
         timer: { h: 0, m: 0, s: 0 }
      };
   }

   // TODO: move 'time' to REDUX
   public componentDidMount(): void {
      this.props.onGetLastSession()
      // .then(() => this.updateTimer(this.props.session.time))
      ;
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
                  <Grid item xs={2} className={classes.digits}>{formatTime(this.state.time).hour}</Grid>
                  <Grid item xs={1} className={classes.digits}>:</Grid>
                  <Grid item xs={2} className={classes.digits}>{formatTime(this.state.time).minute}</Grid>
                  <Grid item xs={1} className={classes.digits}>:</Grid>
                  <Grid item xs={2} className={classes.digits}>{formatTime(this.state.time).second}</Grid>
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
      console.log('runTimer: this.props.session = ', this.props.session);
      this.setState({
         start: Date.now() + this.state.time, // TODO: move 'time' to REDUX
         isOn: true,
         btnName: 'Stop',
      });
      this.timer = setInterval(() => {
         const time = this.state.start - Date.now();
         this.updateSessionTime(time);
         this.setState({ time });
      }, 1000);
   };

   private updateSessionTime (time: number): void {
      console.log('updateSessionTime ===> this.props.session.time: ', this.props.session.time);

      if (this.props.session.time - this.state.time >= env.REACT_APP_SESSION_UPDATE_TIME) {
         this.setState({time: time}); // TODO: move 'time' to REDUX
         this.props.onUpdateSession(this.props.session.id, {time: this.state.time});
      }
   }

   private stopTimer = () => {
      this.setState({
         isOn: false,
         btnName: 'Start',
      });
      clearInterval(this.timer);
   };

   private toggleTimer = () => (this.state.isOn) ? this.stopTimer() : this.runTimer();

   private changeTime = (timeSegment = "", direction = "") => {
      if (this.state.start) {
         return;
      }

      let changeTime = +this.state.time;
      let vary = 0;

      if (direction === TIME_TURN.up) {
         vary = 1;
      } else if (direction === TIME_TURN.down) {
         vary = -1;
      }

      if (timeSegment === _I.h.name) {
         changeTime += vary * (_I.m.max * _I.s.max * _I.ms.max);
      } else if (timeSegment === _I.m.name) {
         changeTime += vary * (_I.s.max * _I.ms.max);
      } else if (timeSegment === _I.s.name) {
         changeTime += vary * _I.ms.max;
      }

      if (changeTime >= 0) {
         this.setState({time: changeTime}); // TODO: move 'time' to REDUX
      }
   };
}

const mapStateToProps = (state: any) => ({
   session: state.sessionReducers.session
});

const mapDispatchToProps = (dispatch: any) => ({
   onCreateSession: (sessionOptions: any) => createSession(dispatch, sessionOptions),
   onGetLastSession: () => getLastSession(dispatch),
   onUpdateSession: (id: string, updateSessionFields: any) => updateSession(dispatch, id, updateSessionFields),
});

export default connect (
   mapStateToProps,
   mapDispatchToProps
)(
   withStyles(styles, { withTheme: true })(Timer)
);
