import React, {Component} from 'react';
import { styled } from "@material-ui/core";

const hideBtnImg = require('../../images/hide_btn.png');

const HideButton = styled('div')({
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
});

class Hide extends Component<any, any> {
   public render() {
      return (
         <HideButton onClick={this.handleClick}/>
      );
   }

   private handleClick = () => {
      console.log('Hide button works!');
   };
}

export default Hide;
