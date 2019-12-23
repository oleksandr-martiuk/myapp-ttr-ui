import React, {Component} from 'react';
import clsx from 'clsx';
import {
   createStyles,
   Grid,
   List,
   ListItem,
   ListItemText,
   TextField, Typography
} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import {withStyles} from "@material-ui/styles";

const styles = (theme: Theme) => ({
   root: {
      padding: theme.spacing(0, 1),
      '& .MuiListItem-root': {
         padding: theme.spacing(0.2, 1),
         border: `0.5px solid ${theme.palette.primary.dark}`,
         '&:hover': {
            backgroundColor: theme.palette.background.paper,
         }
      },
      '& .MuiList-root': {
         width: '100%'
      }
   },
   block: {
      padding: theme.spacing(0.2),
      margin: theme.spacing(0.5, 0),
   }
});

const TaskInput = withStyles((theme: Theme) =>
   createStyles({
      root: {
         width: '100%',
         '& .MuiFormLabel-root': {
            fontSize: '15px'
         },
         '& .MuiInput-underline': {
            '&:hover:not(.Mui-disabled):before': {
               borderBottom: `0.5px solid ${theme.palette.primary.main}`
            }
         }
      },
      label: {
         '& .MuiInput-formControl': {
            marginTop: '10px'
         }
      },
      input: {
         padding: theme.spacing(0, 0, 1, 0),
      }
   })
)(TextField);

class TimeTracker extends Component<any, any> {
   constructor(readonly props: any) {
      super(props);
      this.state = {
         tasks: [
            { description: "TEST #001", time: 1577093611733 },
            { description: "TEST #002", time: 1577093614918 },
            { description: "TEST #003", time: 1577093616912 },
            { description: "TEST #004", time: 1577093618614 },
            { description: "TEST #005", time: 1577093620145 }
         ]
      };
   }

   public render () {
      const { classes } = this.props;

      return (
         <div>

            <Grid container>
               <TaskInput id="task-input"  label="Add task here..." onKeyPress={(event) => this.addTask(event)}/>
            </Grid>

            <Grid container className={clsx( classes.block, classes.root )}>

               <Grid xs={12}>
                  <Typography variant="h4" align="center" color="primary" gutterBottom>
                     Tasks of SESSION:
                  </Typography>
               </Grid>

               <List component="nav" aria-label="main mailbox folders">
                  {this.state.tasks.map((task: any, index: number) => (
                     <>
                        <ListItem button key={index}>
                           <ListItemText primary={++index + ". " + task.description} />
                        </ListItem>
                     </>
                  ))}
               </List>

            </Grid>

         </div>
      )
   };

   private addTask (ev: any) {
      if (ev.key === 'Enter') {
         const tasks = this.state.tasks;
         tasks.push({
            description: ev.target.value,
            time: new Date().getTime()
         });

         this.setState({ tasks: tasks });

         console.log('TASKS: ', this.state.tasks);

         ev.preventDefault();
      }
   }
}

export default withStyles(styles, { withTheme: true })(TimeTracker);
