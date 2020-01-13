import React, {Component} from 'react';
import {connect} from "react-redux";
import {createSession, getLastSession} from "../../../components/TimeReports/redux/Session/session.services";
import {ISessionOptions} from "../../services/requests/session";
import {styled} from "@material-ui/core";
import {IMenuItem} from "./types/menu-item";
import {MENU_ITEMS} from "../../constants";
import {ITime} from "../../../components/TimeReports/redux/Time/types/time";
import {updateTimeAction} from "../../../components/TimeReports/redux/Time/time.actions";

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

const MenuWindow = styled('div')({
   position: 'fixed',
   top: '55px',
   left: '10px',
   zIndex: 100,
   border: '0.5px solid #46a882',
   borderRadius: '3px',
   backgroundColor: '#000000',
   color: '#FFFFFF',
   width: '200px',
   height: '105px',
   alignContent: 'center',
   padding: '10px',
});

const MenuItem = styled('div')({
   color: '#46a882',
   padding: '8px',
   cursor: 'pointer',
   "&:hover": {
      color: '#FFFFFF',
      textShadow: '0 0 10px #46a882',
   }
});

class Menu extends Component<any, any> {
   constructor(props: any) {
      super(props);
      this.state = {
         onWindowShow: false,
         items: MENU_ITEMS
      }
   }

   public render() {
      return (
         <>
            <MenuButton onClick={this.handleClick}/>
            {(this.state.onWindowShow)
               ? <MenuWindow>
                     {this.state.items.map((item: IMenuItem, index: number) => {
                        if (item.key === 'createSession' && this.props.session.isRunning) {
                           console.log('MenuWindow: ', MenuWindow); // TODO: remove such log
                           return null;
                        }
                        return (
                           <MenuItem key={item.key} onClick={() => this.handleItemClick(item.key)}>
                              {item.value}
                           </MenuItem>
                        );
                     })}
                 </MenuWindow>
               : null
            }
         </>
      );
   }

   private handleClick = () => {
      this.setState({ onWindowShow: !this.state.onWindowShow });
   };

   private handleItemClick = (key: string) => {
      if (key === 'createSession') {
         const sessionOptions = {
            time: process.env.REACT_APP_START_TIME,
            noteTime: process.env.REACT_APP_NOTE_TIME
         };

         this.props
            .onCreateSession(sessionOptions)
            .then(() => this.props.onGetLastSession())
            .then(() => this.props.onUpdateTime(this.props.session.time));
      }
   }
}

const mapStateToProps = (state: any) => ({
   session: state.sessionState.session
});
const mapDispatchToProps = (dispatch: any) => ({
   onCreateSession: (sessionOptions: ISessionOptions) => createSession(dispatch, sessionOptions),
   onUpdateTime: (time: ITime) => dispatch(updateTimeAction(time)),
   onGetLastSession: () => getLastSession(dispatch)
});

export default connect (
   mapStateToProps,
   mapDispatchToProps
)(Menu);
