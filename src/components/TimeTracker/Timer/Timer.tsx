import React from 'react';
import {Box, Grid} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      digitalBlock: {
         textAlign: 'center',
      },
      digits: {
         fontSize: '100px',
         height: '70px',
         display:'flex',
         flexDirection: 'column',
         justifyContent: 'center',
      },
      arrows: {
         height: '20px',
         padding: '0 0 5px 0',
         zIndex: 1,
      },
      cursor: {
         cursor: 'pointer',
         color: theme.palette.primary.main
      },
   })
);

export default function Timer() {
   const { digitalBlock, arrows, digits, cursor } = useStyles();

   const doIt = () => console.log('Clicked: DO IT');
   const doThat = () => console.log('Clicked: DO THAT');

   return (
      <div>
         <Grid container>

            <Grid container>
               <Grid className={clsx(digitalBlock)} xs={2}></Grid>
               <Grid className={clsx(digitalBlock, arrows)} xs={2}><ExpandLess className={cursor} onClick={doIt}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrows)} xs={2}><ExpandLess className={cursor} onClick={doIt}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrows)} xs={2}><ExpandLess className={cursor} onClick={doIt}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={2}></Grid>
            </Grid>

            <Grid container>
               <Grid className={clsx(digitalBlock, digits)} xs={2}></Grid>
               <Grid className={clsx(digitalBlock, digits)} xs={2}>00</Grid>
               <Grid className={clsx(digitalBlock, digits)} xs={1}>:</Grid>
               <Grid className={clsx(digitalBlock, digits)} xs={2}>00</Grid>
               <Grid className={clsx(digitalBlock, digits)} xs={1}>:</Grid>
               <Grid className={clsx(digitalBlock, digits)} xs={2}>00</Grid>
               <Grid className={clsx(digitalBlock, digits)} xs={2}></Grid>
            </Grid>

            <Grid container>
               <Grid className={clsx(digitalBlock)} xs={2}></Grid>
               <Grid className={clsx(digitalBlock, arrows)} xs={2}><ExpandMore className={cursor} onClick={doThat}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrows)} xs={2}><ExpandMore className={cursor} onClick={doThat}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrows)} xs={2}><ExpandMore className={cursor} onClick={doThat}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={2}></Grid>
            </Grid>

            <Grid xs={2}></Grid>
         </Grid>
      </div>
   )
}
