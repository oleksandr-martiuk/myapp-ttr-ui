import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import {Button, Grid} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import clsx from "clsx";
import moment from "moment";

const styles = (theme: Theme) => ({
   digitalBlock: {
      textAlign: 'center',
   },
   buttonBlock: {
      textAlign: 'center',
      alignContent: 'center',
   },
   btn: {
      border: '1px solid black'
   },
   digits: {
      fontSize: '80px',
      height: '60px',
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'center',
   },
   arrowBlock: {
      height: '20px',
      padding: '0 0 5px 0',
      zIndex: 1,
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
}) as any; // TODO: fix it

class Timer extends Component<any, any> {
   public timer: any;

   constructor(readonly props: any) {
      super(props);
      this.state = {
         start: 0,
         time: 28800000,
         isOn: false,
         btnName: 'Start',
         timer: {
            h: 0,
            m: 0,
            s: 0
         }
      };
      this.timer = 0;
   }

   runTimer = () => {
      this.setState({
         start: Date.now() + this.state.time,
         isOn: true,
         btnName: 'Stop',
      });
      this.timer = setInterval(() => {
         const time = this.state.start - Date.now();
         this.updateTimer(time);
         console.log(time);
      }, 1000);
   };

   updateTimer = (time: number) => {
      console.log('Update TIME => time: ', time);

      const hours = Math.trunc(moment.duration(time).asHours());
      const minutes = moment.duration(time).minutes();
      const seconds = moment.duration(time).seconds();

      this.setState({
         time: time,
         timer: {
            h: (hours < 10) ? "0" + hours : hours,
            m: (minutes < 10) ? "0" + minutes : minutes,
            s: (seconds < 10) ? "0" + seconds : seconds
         }
      });
   };

   stopTimer = () => {
      this.setState({
         isOn: false,
         btnName: 'Start',
      });
      clearInterval(this.timer);
      console.log('--------------------------------------------------');
   };

   toggleTimer = () => (this.state.isOn) ? this.stopTimer() : this.runTimer();

   changeTime = (timeSegment = "", vary = 0) => {
      console.log('timeSegment=', timeSegment, ' | vary=', vary);
      let changeTime = +this.state.time;

      const maxMs = 1000;
      const maxSec = 60;
      const maxMin = 60;

      console.log('1. changeTime = ', changeTime);
      if (timeSegment === 'hours') {
         changeTime += vary * (maxMin * maxSec * maxMs);
      } else if (timeSegment === 'minutes') {
         changeTime += vary * (maxSec * maxMs);
      } else if (timeSegment === 'seconds') {
         changeTime += vary * maxMs;
      }
      console.log('2. changeTime = ', changeTime);

      console.log('---------------------------------------------------------');

      if (changeTime >= 0) {
         this.updateTimer(changeTime);
      }
   };

   render() {
      const { classes } = this.props;

      return (
         <div>
            <Grid container>

               <Grid container>
                  <Grid className={clsx(classes.digitalBlock)} xs={2}></Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.arrowBlock)} xs={2}>
                     <ExpandLess className={classes.arrow} onClick={() => this.changeTime('hours', 1)}/>
                  </Grid>
                  <Grid className={clsx(classes.digitalBlock)} xs={1}></Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.arrowBlock)} xs={2}>
                     <ExpandLess className={classes.arrow} onClick={() => this.changeTime('minutes', 1)}/>
                  </Grid>
                  <Grid className={clsx(classes.digitalBlock)} xs={1}></Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.arrowBlock)} xs={2}>
                     <ExpandLess className={classes.arrow} onClick={() => this.changeTime('seconds', 1)}/>
                  </Grid>
                  <Grid className={clsx(classes.digitalBlock)} xs={2}></Grid>
               </Grid>

               <Grid container>
                  <Grid className={clsx(classes.digitalBlock, classes.digits)} xs={2}></Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.digits)} xs={2}>{this.state.timer.h}</Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.digits)} xs={1}>:</Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.digits)} xs={2}>{this.state.timer.m}</Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.digits)} xs={1}>:</Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.digits)} xs={2}>{this.state.timer.s}</Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.digits)} xs={2}></Grid>
               </Grid>

               <Grid container>
                  <Grid className={clsx(classes.digitalBlock)} xs={2}></Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.arrowBlock)} xs={2}>
                     <ExpandMore className={classes.arrow} onClick={() => this.changeTime('hours', -1)}/>
                  </Grid>
                  <Grid className={clsx(classes.digitalBlock)} xs={1}></Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.arrowBlock)} xs={2}>
                     <ExpandMore className={classes.arrow} onClick={() => this.changeTime('minutes', -1)}/>
                  </Grid>
                  <Grid className={clsx(classes.digitalBlock)} xs={1}></Grid>
                  <Grid className={clsx(classes.digitalBlock, classes.arrowBlock)} xs={2}>
                     <ExpandMore className={classes.arrow} onClick={() => this.changeTime('seconds', -1)}/>
                  </Grid>
                  <Grid className={clsx(classes.digitalBlock)} xs={2}></Grid>
               </Grid>

               <Grid container>
                  <Grid  className={classes.buttonBlock} xs={12}>
                     <Button className={classes.btn} onClick={this.toggleTimer}>
                        {this.state.btnName}
                     </Button>
                  </Grid>
               </Grid>

            </Grid>
         </div>
      );
   }
}

export default withStyles(styles, { withTheme: true })(Timer);
