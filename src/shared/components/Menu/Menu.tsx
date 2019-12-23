import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton, Menu, MenuItem} from "@material-ui/core";

const options = [
   'Start NEW session'
];

const ITEM_HEIGHT = 48;

export default function AppMenu() {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div>
         <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            color="primary"
            onClick={handleClick}
         >
            <MenuIcon />
         </IconButton>
         <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
               style: {
                  maxHeight: ITEM_HEIGHT * 3,
                  width: 200,
               },
            }}
         >
            {options.map(option => (
               <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                  {option}
               </MenuItem>
            ))}
         </Menu>
      </div>
   );
}
