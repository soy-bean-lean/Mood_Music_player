import React from 'react';
import {SideDivWhole} from '../../style/sidebar'
import { BrowserRouter as Router, Routes, Route,Link,Navigate} from 'react-router-dom';
import Logout from '../Logout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard , faMusic , faList} from "@fortawesome/free-solid-svg-icons";
import DashBoard from './DashBoard'
import AddSongs from './AddSongs/AddSongs'
import RedirectToAdmin from './RedirectToAdmin';
import ListSongs from './AddSongs/ListSongs'
import SingelSongs from './AddSongs/SingelSongs'
import EditUpdate from './AddSongs/EditUpdate';

const DrawerSideBar = ({AUTHORIZATION_TOKEN}) => {


    const _link_style_inner = {
        textDecoration: "none",
    }
    const _icon_style_ ={
        marginRight:"10px",
        marginLeft:"41px",
        marginTop:"80px",
        fontSize:"25px"
    }
    const _ui_style_ = {
        listStyle:"none",
    }

  return (
        <>
        <Router>
            <SideDivWhole>
                <div className="_left_side_nav_bar_">
                    <ul>
                        <li style={_ui_style_}>
                            <Link style={_link_style_inner} to="/Dashboard">
                                <FontAwesomeIcon  style={_icon_style_} icon={faDashboard}></FontAwesomeIcon>
                                <span style={{marginLeft:"17px"}}><b>DashBoard</b></span>
                            </Link>
                        </li>
                        <li style={_ui_style_}>
                            <Link style={_link_style_inner} to="/AddSongs">
                                <FontAwesomeIcon  style={_icon_style_} icon={faMusic}></FontAwesomeIcon>
                                <span style={{marginLeft:"17px"}}><b>AddSongs</b></span>
                            </Link>
                        </li>
                        <li style={_ui_style_}>
                            <Link style={_link_style_inner} to="/ListSongs">
                                <FontAwesomeIcon  style={_icon_style_} icon={faList}></FontAwesomeIcon>
                                <span style={{marginLeft:"17px"}}><b>List of Songs</b></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </SideDivWhole>
            <Routes>
            <Route path="/Dashboard" element={<DashBoard  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
            <Route path="/AddSongs" element={<AddSongs  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
            <Route path="ListSongs">
                <Route index element={<ListSongs AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />} />
                    <Route path="songsdata/:name" element={<SingelSongs  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}  />} />
                    <Route path="update/:name" element={<EditUpdate AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>} />
            </Route>
            <Route path="/*" element={<RedirectToAdmin  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
            <Route path="/logout" element={<Logout  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
            </Routes>
        </Router>
      </>
  )
};
export default DrawerSideBar;