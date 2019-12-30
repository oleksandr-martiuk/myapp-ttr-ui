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
import ElectronWindow from "../../../shared/services/electron-window";
import {connect} from "react-redux";
import {createReport, deleteReport, readReports} from "../redux/Reports/reports.services";
import {getLastSession} from "../redux/Session/session.services";

const styles = (theme: Theme) => ({
   root: {
      padding: theme.spacing(0, 1),
      '& .MuiListItem-root': {
         padding: theme.spacing(0.2, 1),
         border: `0.5px solid ${theme.palette.primary.dark}`,
         '&:hover': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.main,
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

const ReportInput = withStyles((theme: Theme) =>
   createStyles({
      root: {
         margin: theme.spacing(0, 0, 3, 0),
         width: '100%',
         '& .MuiFormLabel-root': {
            fontSize: '15px'
         },
         '& .MuiInput-underline': {
            borderBottom: `0.5px solid ${theme.palette.background.paper}`,
            '&:hover:not(.Mui-disabled):before': {
               borderBottom: `0.5px solid ${theme.palette.primary.main}`,
            }
         },
         '& label .MuiInput-formControl': {
            marginTop: '10px'
         },
         '& input': {
            padding: theme.spacing(0, 0, 1, 0),
         }
      }
   })
)(TextField);

class Reports extends Component<any, any> {
   private window: ElectronWindow;

   constructor(readonly props: any) {
      super(props);
      this.state = {
         report: ""
      };
      this.window = new ElectronWindow();
   }

   componentDidMount(): void {
      this.props.onGetLastSession()
         .then((sessionAction: any) => this.props.onReadReports(sessionAction.payload.id));
   }

   public render () {
      const { classes } = this.props;

      return (
         <div>

            <Grid container>
               <ReportInput
                  id="report-input"
                  label="Add new report here"
                  value={this.state.report}
                  onKeyPress={(event) => this.addReport(event)}
                  onChange={this.handleChange}
               />
            </Grid>

            <Grid container className={clsx( classes.block, classes.root )}>

               <Grid item xs={12}>
                  <Typography variant="h4" align="center" color="primary" gutterBottom>
                     Session REPORTS:
                  </Typography>
               </Grid>

               <List component="nav" aria-label="main mailbox folders">
                  {this.props.reports.map((report: any, index: number) => {
                     const primaryText = (index + 1) + ". " + report.description;

                     return (
                        <ListItem button key={report.id}>
                           <ListItemText primary={primaryText} onClick={() => this.deleteReport(report.id)}/>
                        </ListItem>
                     );
                  })}
               </List>

            </Grid>

         </div>
      )
   };

   private handleChange = (ev: any): void => {
      this.setState({report: ev.target.value});
   };

   private addReport (ev: any): void {
      if (ev.key === 'Enter') {
         this.createNewReport(this.state.report);
         this.setState({report: ""});
         this.window.hide();
         ev.preventDefault();
      }
   }

   private createNewReport (value: string): void {
      const reportOptions = {
         sessionId: (this.props.session) ? this.props.session.id : '', // TODO: use REDUX for 'SessionId'
         description: value,
      };

      this.props.onCreateReport(reportOptions);
   }

   private deleteReport (id: number): void {
      this.props.onDeleteReport(id);
   }
}

const mapStateToProps = (state: any) => ({
   reports: state.reportsReducers.reports || [],
   session: state.sessionReducers.session || null
});

const mapDispatchToProps = (dispatch: any) => ({
   onCreateReport: (reportOptions: any) => createReport(dispatch, reportOptions),
   onReadReports: (sessionId: string) => readReports(dispatch, sessionId),
   onDeleteReport: (id: string) => deleteReport(dispatch, id),
   onGetLastSession: () => getLastSession(dispatch),
});

export default connect (
   mapStateToProps,
   mapDispatchToProps
)(
   withStyles(styles, { withTheme: true })(Reports)
);
