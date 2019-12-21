import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import TimeReports from "./TimeReports/TimeReports";
import Timer from "./Timer/Timer";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         'flex-grow': 1,
         'background-color':  theme.palette.background.default,
         'color': theme.palette.text.primary
      },
      timerBlock: {
         margin: theme.spacing(0),
         padding: theme.spacing(0),
         'background-color': theme.palette.background.default,
         'color': theme.palette.text.primary,
         'border': `1px solid ${theme.palette.primary.main}`,
         'border-radius': "3px"
      },
      reports: {
         height: "355px"
      },
      textCenter: {
         textAlign: 'center'
      },
      textRight: {
         textAlign: 'right'
      },

   }),
);

export default function TimeTracker() {
   const {root, timerBlock, textCenter, textRight, reports} = useStyles();

   return (
      <div>
         <Grid container>
            <Grid className={clsx(root)} xs={2}>MENU</Grid>

            <Grid container className={clsx(root)} xs={8}>
               <Grid className={clsx(textCenter)} xs={12}>Button RUN/STOP</Grid>

               <Grid className={clsx(textCenter, timerBlock)} xs={12}><Timer/></Grid>

               <Grid className={clsx(timerBlock)} xs={12}>
                  <TimeReports />
               </Grid>

               <Grid className={clsx(textCenter, timerBlock)} xs={12}>Task input...</Grid>
            </Grid>

            <Grid className={clsx(root, textRight)} xs={2}>HIDE button</Grid>
         </Grid>
      </div>
   );
}
