import React, {Component} from 'react';
import ElectronWindow from "../../services/electron-window";
import {withStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core/styles";

const hideBtnImg = require('../../images/hide_btn.png');

const styles = (theme: Theme): any => ({
   hideButton: {
      backgroundImage: `url(${hideBtnImg})`,
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 1,
      border: '1px solid #46a882',
      borderRadius: '3px',
      backgroundRepeat: 'no-repeat',
      color: '#FFFFFF',
      width: '39px',
      height: '38px',
      cursor: 'pointer',
      alignContent: 'center',
      '&:hover': {
         backgroundPosition: '0 -38.6px',
         boxShadow: '0 0 10px #60daaa',
      },
      '&:active': {
         backgroundPosition: '0 -77.5px',
         boxShadow: '0 0 10px #46a882',
      }
   }
});

class Hide extends Component<any, any> {
   private window: ElectronWindow;

   constructor(props: any) {
      super(props);
      this.window = new ElectronWindow();
   }

   public render() {
      const { classes } = this.props;
      return (
         <div className={classes.hideButton} onClick={this.hideWindow}/>
      );
   }

   private hideWindow = () => {
      this.window.hide();
   };
}

export default withStyles(styles, { withTheme: true })(Hide);
