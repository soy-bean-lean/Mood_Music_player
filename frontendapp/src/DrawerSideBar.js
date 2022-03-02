import React , {useState,useEffect} from 'react';
import {SideDivWhole} from './style/sidebar'
import { BrowserRouter as Router, Routes, Route,Link,Navigate} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Music from './components/Music';
import PageNotFound from './components/PageNotFound';
import SongList from './components/songs/SongList';
import SingleEmotionsSongs from './components/songs/SingleEmotionsSongs';
import SingleMusicPlay from './components/songs/SingleMusicPlay';
import EmailVerification from './components/accounts/EmailVerification';
import Signup from './Signup'
import Login from './components/Login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeadphones,faHome,faMusic,faUser,faUserCheck,faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Logout from './components/Logout';
import Goto from './components/Goto';
import ResendEmailVerification from './components/accounts/ResendEmailVerification';
import ResetPassword from './components/accounts/ResetPassword';
import ResetPasswordFinal from './components/accounts/ResetPasswordFinal';
import Payments from './components/payments/Payments';
import Subcription from './components/payments/Subcription';
import VerfiyPayments from './components/payments/VerfiyPayments';

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


            {
            (AUTHORIZATION_TOKEN)?
                <>
                        <Router>
                            <SideDivWhole>
                            <div className="_left_side_nav_bar_">
                            <ul>
                            <li style={_ui_style_}>
                            <Link style={_link_style_inner} to="/Dashboard">
                                <FontAwesomeIcon  style={_icon_style_} icon={faHome}></FontAwesomeIcon>
                                <span style={{marginLeft:"17px"}}><b>DashBoard</b></span>
                            </Link>
                            </li>
                            <li style={_ui_style_}>
                            <Link  style={_link_style_inner} to="/music">
                                <FontAwesomeIcon  style={_icon_style_}  icon={faHeadphones}></FontAwesomeIcon>
                                <span style={{marginLeft:"17px"}}><b>Listen a song</b></span>
                            </Link>
                            </li>
                            <li style={_ui_style_}>
                            <Link  style={_link_style_inner} to="/Songs">
                                <FontAwesomeIcon  style={_icon_style_}  icon={faMusic}></FontAwesomeIcon>
                                <span style={{marginLeft:"17px"}}><b>Songs</b></span>
                            </Link>
                            </li>
                            <li style={_ui_style_}>
                            <Link  style={_link_style_inner} to="/payment">
                                <FontAwesomeIcon  style={_icon_style_}  icon={faMoneyBill}></FontAwesomeIcon>
                                <span style={{marginLeft:"17px"}}><b>Payment</b></span>
                            </Link>
                            </li>
                        </ul>
                    </div>
                    </SideDivWhole>
                    <Routes>
                            <Route path="" element={<Music  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
                            <Route path="/music" element={<Music  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
                            <Route path="/Dashboard" element={<Dashboard AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>} />
                            <Route path="/*" element={<PageNotFound />} />
                            <Route path="/login" element={<Login AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
                            <Route path="activate/:id/:token" element={<EmailVerification />} />
                            <Route path="Songs" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}>
                                <Route index element={<SongList AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />} />
                                    <Route path="singleemitions/:emotions" element={<SingleEmotionsSongs AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>} />
                                    <Route path="playsongs/:name" element={<SingleMusicPlay AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>} />
                            </Route>
                            {/* <Route path=":page" element={<Goto AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/> */}
                            {/* <Route path="/logout" element={<Logout />}/> */}
                            <Route path="/logout" element={<Logout AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
                            <Route path="/signup" element={<Signup AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>


                            <Route path="payment" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}>
                                <Route index element={<Payments AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />} />
                                    <Route path="subcription/:subcription" element={<Subcription AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />} />
                            </Route>
                            <Route path="/payments_data/Verify-Transaction/:subcription" element={<VerfiyPayments AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>} />
                            <Route path="/*" element={<PageNotFound />} />
                    </Routes>
                    </Router>
                </>

                :
                <>
                    <Router>
                    <SideDivWhole>
                    <div className="_left_side_nav_bar_">
                        <ul>
                        <li style={_ui_style_}>
                        <Link style={_link_style_inner} to="/login">
                            <FontAwesomeIcon  style={_icon_style_} icon={faUserCheck}></FontAwesomeIcon>
                            <span style={{marginLeft:"17px"}}><b>Login</b></span>
                        </Link>
                        </li>
                        <li style={_ui_style_}>
                        <Link  style={_link_style_inner} to="/signup">
                            <FontAwesomeIcon  style={_icon_style_}  icon={faUser}></FontAwesomeIcon>
                            <span style={{marginLeft:"17px"}}><b>Signup</b></span>
                        </Link>
                        </li>
                        {/* <li style={_ui_style_}>
                        <Link  style={_link_style_inner} to="/Songs">
                            <FontAwesomeIcon  style={_icon_style_}  icon={faMusic}></FontAwesomeIcon>
                            <span style={{marginLeft:"17px"}}><b>Songs</b></span>
                        </Link>
                        </li> */}
                        </ul>
                    </div>
                </SideDivWhole>
                    <Routes>

                            <Route path="/" element={<Goto AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
                            <Route path="/login" element={<Login AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
                            {/* <Route path="Songs">
                                <Route index element={<SongList />} />
                                    <Route path="singleemitions/:emotions" element={<SingleEmotionsSongs />} />
                                    <Route path="playsongs/:name" element={<SingleMusicPlay />} />
                            </Route> */}
                            <Route path="/resend-email" element={<ResendEmailVerification />} />
                            <Route path="/reset_password" element={<ResetPassword />} />

                            <Route path="password/reset/confirm/:id/:token" element={<ResetPasswordFinal />} />

                            <Route path="/signup" element={<Signup />} />
                            <Route path="activate/:id/:token" element={<EmailVerification />} />
                            <Route path=":page" element={<Goto AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>}/>
                            <Route path="/logout" element={<Logout />}/>
                            <Route path="/*" element={<PageNotFound />} />
                    </Routes>
                    </Router>
                </>
            }
      </>
  )
};
export default DrawerSideBar;