import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import TimeReports from "./TimeReports/TimeReports";
import Timer from "./Timer/Timer";
import Hide from "../../shared/components/Hide/Hide";
import AppMenu from "../../shared/components/Menu/Menu";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
         backgroundColor:  theme.palette.background.default,
         color: theme.palette.text.primary
      },
      block: {
         padding: theme.spacing(0.5),
         margin: theme.spacing(0.5, 0),
         backgroundColor: theme.palette.background.default,
         color: theme.palette.text.primary,
      },
      timer: {
         margin: theme.spacing(1)
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
   const {root, block, timer, textCenter, textRight} = useStyles();

   return (
      <div>
         <Grid container>
            <Grid className={clsx(root)} xs={2}><AppMenu/></Grid>

            <Grid container className={clsx(root)} xs={8}>
               <Grid className={clsx(timer, textCenter)} xs={12}>
                  <Timer/>
               </Grid>
               <Grid className={block} xs={12}>
                  <TimeReports/>
               </Grid>
            </Grid>

            <Grid className={clsx(root, textRight)} xs={2}><Hide/></Grid>
         </Grid>
      </div>
   );
}
