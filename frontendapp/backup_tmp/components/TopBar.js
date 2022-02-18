import React from 'react';
import { useNavigate } from "react-router-dom";
import { TopShadowBar } from "../style/TopShadowBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignOutAlt,faUser,faArrowRight} from "@fortawesome/free-solid-svg-icons";

const TopBar = ({TopBarName,URL_TO_GO,AUTHORIZATION_TOKEN,URL_WITH_OUT_LOGIN}) => {
    let navigate = useNavigate();

  return (
      <>
            <TopShadowBar>
            <div className='top_bar_with_shadow_class'>
            <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>{TopBarName} </p>
            {(AUTHORIZATION_TOKEN)?
            <>
                <button className='btn btn-danger float-right'
                onClick={
                    ()=>{
                    navigate(URL_TO_GO)
                    }
                }
                >
                    <FontAwesomeIcon size ='1x' icon={faSignOutAlt}></FontAwesomeIcon>
                </button>
            </>
            :
            <>
                <button className='btn btn-warning float-right'
                onClick={
                    ()=>{
                    navigate('/'+ URL_WITH_OUT_LOGIN)
                    }
                }
                >
                    <FontAwesomeIcon size ='1x' icon={faUser}></FontAwesomeIcon>
                </button>
                <FontAwesomeIcon className='btn float-right' size ='1x' icon={faArrowRight}></FontAwesomeIcon>

            </>
            }
            </div>
        </TopShadowBar>
    </>
  )
};

export default TopBar;
