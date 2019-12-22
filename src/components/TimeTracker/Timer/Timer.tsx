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
      },
   })
);

export default function Timer() {
   const { digitalBlock, arrowBlock, digits, arrow } = useStyles();

   const doIt = () => console.log('Clicked: DO IT');
   const doThat = () => console.log('Clicked: DO THAT');

   return (
      <div>
         <Grid container>

            <Grid container>
               <Grid className={clsx(digitalBlock)} xs={2}></Grid>
               <Grid className={clsx(digitalBlock, arrowBlock)} xs={2}><ExpandLess className={arrow} onClick={doIt}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrowBlock)} xs={2}><ExpandLess className={arrow} onClick={doIt}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrowBlock)} xs={2}><ExpandLess className={arrow} onClick={doIt}/></Grid>
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
               <Grid className={clsx(digitalBlock, arrowBlock)} xs={2}><ExpandMore className={arrow} onClick={doThat}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrowBlock)} xs={2}><ExpandMore className={arrow} onClick={doThat}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={1}></Grid>
               <Grid className={clsx(digitalBlock, arrowBlock)} xs={2}><ExpandMore className={arrow} onClick={doThat}/></Grid>
               <Grid className={clsx(digitalBlock)} xs={2}></Grid>
            </Grid>

         </Grid>
      </div>
   )
}
