import React from 'react';
import { TopShadowBar } from "../style/TopShadowBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import TrendingSongsList from './TrendingSongsList'
import './blink.css'
const TrendingMusic = ({AUTHORIZATION_TOKEN}) => {
    const _call_emotions_songs = () =>{
        console.log("test")
    }
  return (
      <>
        <TopShadowBar>
        <div className='top_bar_with_shadow_class' style={{backgroundColor:"#96e4e7"}}>
        <p className="blink float-left" style={{fontSize:"15px",padding:"5px",fontWeight:"bold",display:"inline-block"}}>
            <span className='span_trending' style={{fontWeight:"bold",color:"#0400f1"}}>Emotion Based Like songs </span> 😀 😔 🙂 😳 🤢 😲 😡
        </p>
        <center>
            <button type="button" className='btn btn-warning float-right' style={{fontWeight:"bold"}}
            onClick={()=>{
                _call_emotions_songs()
            }}
            >
            <FontAwesomeIcon size ='1x' icon={faSyncAlt}></FontAwesomeIcon>
            </button>
        </center>
        </div>
        </TopShadowBar>
        <div>
            <TrendingSongsList AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
        </div>
      </>
  )
};

export default TrendingMusic;
