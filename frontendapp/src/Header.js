import React, { useState } from 'react';
import './Header.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Link } from '@mui/material';
import { Switch } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { _set_admin_to_user_} from './features/IsAdmin'


const Header = ({ADMIN_PANEL}) => {
    let __check__admin__ = useSelector((state) => state.ISADMINCOUNTER._IS_ADMIN_STATE_)
    // console.log("__check__admin__ "+__check__admin__)
    const dispatch = useDispatch()

    const _top_bar_ = {
        backgroundColor: "rgb(52 219 111)",
        boxShadow: "10px 10px 8px #888888",
        position: "sticky",
        top: "0",
        width: "100%",
        zIndex: "1000",
        display: "inline-block",
        backgroundColor:"rgb(193 195 255)"
        };
        const _image_top_nav_ = {
          verticalAlign: "middle",
          width: "65px",
          height: "30px",
          borderRadius: "50%",
        };

    return (
        <>
         <Card style={_top_bar_}>
            <CardContent >
            <div className='TopDiv' style={(ADMIN_PANEL)?{height:"20px",fontSize:"20px"}:null}>
            {(ADMIN_PANEL)?
                    <>
                        <p style={{fontWeight:"bold",color:"green"}}>
                            {ADMIN_PANEL}
                            <span style={{fontWeight:"bold",float:"right",color:"#48291f"}}>
                                Switch to Normal user
                                <Switch
                                    onClick={()=>{
                                        dispatch(_set_admin_to_user_(false));
                                    }}
                                />
                            </span>
                        </p>
                    </>
                :
                (__check__admin__)?
                        <>
                            <p style={{fontWeight:"bold",color:"green"}}>
                                Admin Panel
                                <span style={{fontWeight:"bold",float:"right",color:"#48291f"}}>
                                    Switch to Admin user
                                    <Switch
                                        checked={true}
                                        onClick={()=>{
                                            dispatch(_set_admin_to_user_(true));
                                        }}
                                    />
                                </span>
                            </p>
                        </>
                    :
                    <>
                        <center>
                                <span className="slow">Music</span>
                                <span className="slow">Mood</span>
                                <span className="slow">Player</span>
                        </center>
                    </>
                }
            </div>
            {(ADMIN_PANEL)?
                null
                :
                (__check__admin__)?
                    null
                :
                    <>
                    <div className="topBar">
                        <div className='para'>
                            <span style={{fontSize:"20px",color:"#000000",marginRight:"10px",fontFamily:"monospace"}}>Are you</span>(Happy 😀) (sad 😔) (neutral 🙂) (fear 😳) (diguest 🤢) (surprise 😲) (angry 😡)
                        </div>
                    </div>
                    </>
            }
            </CardContent>
        </Card>
        </>
    )
};

export default Header;