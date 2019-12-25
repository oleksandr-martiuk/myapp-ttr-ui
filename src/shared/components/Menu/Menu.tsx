import React, {Component} from 'react';
import { styled } from "@material-ui/core";

const menuBtnImg = require('../../images/menu_btn.png');

const MenuButton = styled('div')({
   backgroundImage: `url(${menuBtnImg})`,
   position: 'fixed',
   backgroundPosition: '0 -1px',
   top: '10px',
   left: '10px',
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
      backgroundPosition: '0 -39.6px',
      boxShadow: '0 0 10px #60daaa',
   },
   '&:active': {
      backgroundPosition: '0 -78.5px',
      boxShadow: '0 0 10px #46a882',
   }
});

class Menu extends Component<any, any> {
   public render() {
      return (
         <MenuButton onClick={this.handleClick}/>
      );
   }

   private handleClick = () => {
      console.log('Menu button works!');
   };
}

export default Menu;
