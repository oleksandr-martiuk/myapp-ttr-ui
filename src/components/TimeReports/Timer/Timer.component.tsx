import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import {Button, Grid} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import moment from "moment";
import {interval as i, changeWay, SESSION_UPDATE_TIME} from "../../../shared/constants";
import {connect} from "react-redux";
import {createSession, getLastSession, updateSession} from "../redux/Session/session.services";

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
         time: 0,
         isOn: false,
         btnName: 'Start',
         timer: { h: 0, m: 0, s: 0 }
      };
      this.timer = 0;
   }

   public componentDidMount(): void {
      this.props.onGetLastSession().then(() => this.updateTimer(this.props.session.time));
   }

   public render() {
      const { classes } = this.props;
      const btnTextColor = (this.state.btnName === 'Start') ? "#60daaa" : "#B00020";
      const arrowStyle = (this.state.start) ? classes.arrowDisabled : classes.arrow;

      return (
         <div>
            <Grid container>

               <Grid container>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandLess className={arrowStyle} onClick={() => this.changeTime(i.h.name, changeWay.up)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandLess className={arrowStyle} onClick={() => this.changeTime(i.m.name, changeWay.up)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandLess className={arrowStyle} onClick={() => this.changeTime(i.s.name, changeWay.up)}/>
                  </Grid>
                  <Grid item xs={2}></Grid>
               </Grid>

               <Grid container>
                  <Grid item xs={2} className={classes.digits}></Grid>
                  <Grid item xs={2} className={classes.digits}>{this.state.timer.h}</Grid>
                  <Grid item xs={1} className={classes.digits}>:</Grid>
                  <Grid item xs={2} className={classes.digits}>{this.state.timer.m}</Grid>
                  <Grid item xs={1} className={classes.digits}>:</Grid>
                  <Grid item xs={2} className={classes.digits}>{this.state.timer.s}</Grid>
                  <Grid item xs={2} className={classes.digits}></Grid>
               </Grid>

               <Grid container>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}className={classes.arrowBlock}>
                     <ExpandMore className={arrowStyle} onClick={() => this.changeTime(i.h.name, changeWay.down)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandMore className={arrowStyle} onClick={() => this.changeTime(i.m.name, changeWay.down)}/>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2} className={classes.arrowBlock}>
                     <ExpandMore className={arrowStyle} onClick={() => this.changeTime(i.s.name, changeWay.down)}/>
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
         start: Date.now() + this.state.time,
         isOn: true,
         btnName: 'Stop',
      });
      this.timer = setInterval(() => {
         const time = this.state.start - Date.now();
         this.updateSessionTime(time);
         this.updateTimer(time);
      }, 1000);
   };

   private updateSessionTime (time: number): void {
      if (this.props.session.time - this.state.time >= SESSION_UPDATE_TIME) {
         this.setState({time: time});
         this.props.onUpdateSession(this.props.session.id, {time: this.state.time});
      }
   }

   private updateTimer = (time: number) => {
      const updatedTime: {[index: string]:any} = {
         h: Math.trunc(moment.duration(time).asHours()),
         m: moment.duration(time).minutes(),
         s: moment.duration(time).seconds()
      };

      for (let name in updatedTime) {
         if (updatedTime[name] < 0) {
            updatedTime[name] = -updatedTime[name];
         }
      }

      this.setState({
         time: time,
         timer: {
            h: (updatedTime.h < 10) ? "0" + updatedTime.h : updatedTime.h,
            m: (updatedTime.m < 10) ? "0" + updatedTime.m : updatedTime.m,
            s: (updatedTime.s < 10) ? "0" + updatedTime.s : updatedTime.s
         }
      });
   };

   private stopTimer = () => {
      this.setState({
         isOn: false,
         btnName: 'Start',
      });
      clearInterval(this.timer);
   };

   private toggleTimer = () => (this.state.isOn) ? this.stopTimer() : this.runTimer();

   private changeTime = (timeSegment = "", varyDirection = "") => {
      if (this.state.start) {
         return;
      }

      let changeTime = +this.state.time;
      let vary = 0;

      if (varyDirection === changeWay.up) {
         vary = 1;
      } else if (varyDirection === changeWay.down) {
         vary = -1;
      }

      if (timeSegment === i.h.name) {
         changeTime += vary * (i.m.max * i.s.max * i.ms.max);
      } else if (timeSegment === i.m.name) {
         changeTime += vary * (i.s.max * i.ms.max);
      } else if (timeSegment === i.s.name) {
         changeTime += vary * i.ms.max;
      }

      if (changeTime >= 0) {
         this.updateTimer(changeTime);
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
