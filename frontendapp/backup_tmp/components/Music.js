import React , {useRef,useState,useEffect,useReducer} from 'react';
import axios from 'axios'
import {BACKENDURL_FOR_SONGS } from '../config/urls'
import {IMAGE_FILE } from '../config/image'
import { SideDivForAllComponents } from '../style/SideDivForAllComponents';
import TopBar from "./TopBar";
import './music.css'
import Button from '@mui/material/Button';
import { TopShadowBar } from "../style/TopShadowBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle , faCameraRetro} from "@fortawesome/free-solid-svg-icons";
import Webcam from 'react-webcam'
import TrendingMusic from  './TrendingMusic'
import MusicApp from  './MusicApp'

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import ListOfMusic from  './ListOfMusic'

import { useSelector, useDispatch } from "react-redux"
import { _save_and_play_song_from_list_} from '../features/Pass_data'


const Music = ({AUTHORIZATION_TOKEN}) => {
    const dispatch = useDispatch()

    const webRef = useRef(null);
    const [image_data,setimage_data] = useState(null)
    const [_capturepicture, set_capturepicture] = useState(false)
    const [showimage,setshowimage] = useState(false)
    const [NullImageTmp,setNullImageTmp] = useState(false)
    const [TakeAnotherShot,setTakeAnotherShot] = useState(false)
    const [emotion,setemotion] = useState(null)
    const [songlist,setsonglist] = useState([])
    const [loading,setloading] = useState(false)

    const showImage = () =>{
        // console.log(webRef.current.getScreenshot());
        setimage_data(webRef.current.getScreenshot());
        setshowimage(true)
        setNullImageTmp(true)
      }

      const _call_server = (() =>{
        setloading(true)
        const image_base64_test = IMAGE_FILE
        let BACKENDURL = BACKENDURL_FOR_SONGS
        axios.post(BACKENDURL,{
            name:"roshan",
            // image:image_data
            image: image_base64_test
        })
          .then((response) => {
                // console.log(response.data[0]["category"])
                setemotion(response.data[0]["category"])
                setsonglist(response.data)
                dispatch(_save_and_play_song_from_list_(response.data));
                setimage_data(null)
                // set_capturepicture(false)
                // console.log(songlist.data[0].category)
                setloading(false)
            })
            .catch(err =>{
              console.log(err)
              console.log("bad 400")
              setimage_data(null)
              setTakeAnotherShot(true)
              setloading(false)
            })
      })

      let initialState = []

      const reducer = (state,action) => {
        switch(action.type) {
            case "TAKE_PICTURE":
                set_capturepicture(true)
                setemotion(null)
                setimage_data(null)
                return state;
            case "PICTURE_TAKE_AND_SHOW":
                console.log("take pic")
                setimage_data(null)
                // set_capturepicture(false)
                setemotion(null)
                showImage()
                return state;
            case "CLOSE_PICTURE":
                console.log("close")
                setimage_data(null)
                set_capturepicture(false)
                setemotion(null)
                // set
                return state;
            case "CLOSE_PIC_WITH_VIDEO":
                setNullImageTmp(false)
                set_capturepicture(false)
                setemotion(null)
                setimage_data(null)
                return state;
            case "TAKE_PICTURE_BACK":
                setTakeAnotherShot(false)
                set_capturepicture(true)
                setNullImageTmp(false)
                setemotion(null)
                setimage_data(null)
                return state;
            case "SEND_PICTURE_DATA":
                console.log("send the data")
                _call_server()
                return state;
            default:
                return state;
        }
      }
      const [state, dispatch_reducer] = useReducer(reducer, initialState);

return (
    <>
        <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName="Music" URL_TO_GO="Dashboard" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                {/* flexr div */}
                    <div className='div_photo_and_trending'>
                    <div className="_mobile_view">
                    {(_capturepicture)?
                        (NullImageTmp)
                            ?
                            <>
                                <TopShadowBar>
                                <div className='top_bar_with_shadow_class'>
                                    <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>
                                    {(TakeAnotherShot)?
                                        "Oppps take pic again"
                                        :
                                        "Music is great worksheet "
                                    }
                                    </p>
                                    <button type="button" className='btn btn-danger float-right' style={{fontSize:"20px",fontWeight:"bold"}}
                                    onClick={()=>{
                                        dispatch_reducer({type:"CLOSE_PIC_WITH_VIDEO"})
                                    }}
                                    >
                                    <FontAwesomeIcon size ='1x' icon={faTimesCircle}></FontAwesomeIcon>
                                    </button>
                                </div>
                                </TopShadowBar>
                                {(loading)?
                                    <>
                                        <br></br><br></br>
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                            <LinearProgress />
                                            <LinearProgress />
                                        </Box>
                                    </>
                                :
                                    (emotion)?
                                        <>
                                            <br></br>
                                            {/* <h1>{emotion}</h1> */}
                                            <MusicApp />
                                        </>
                                        :
                                        <center>
                                        {(TakeAnotherShot)?
                                            <>
                                            <img style={{marginTop:"10px",width:"350px",hegith:"350px"}} src="data/thereissomethingswrong.gif" alt="face missing" />
                                            </>
                                            :
                                            <img style={{marginTop:"10px",borderRadius:"50px",height:"350px",width:"350px"}} src={image_data} alt="emotions picture"/>
                                        }
                                        {(emotion)?
                                            null
                                            :
                                            <center>
                                                <br></br>
                                            <Button type="button" color="info" variant="contained" onClick={() =>
                                                    dispatch_reducer({type:"TAKE_PICTURE_BACK"})
                                                }>Take a Another Shot
                                                </Button>
                                            {(TakeAnotherShot)?
                                                    null
                                                :
                                                <>
                                                    <Button style={{marginLeft:"10px"}} type="button" color="success" variant="contained" onClick={() =>
                                                        dispatch_reducer({type:"SEND_PICTURE_DATA"})
                                                    }>Submit
                                                    </Button>
                                                </>
                                            }
                                            </center>
                                        }
                                        </center>
                                // loading false
                                }
                            </>
                            :

                            <TopShadowBar>
                                    <div className='top_bar_with_shadow_class'>
                                        <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>Take A picture </p>

                                        <button type="button" className='btn btn-danger float-right' style={{fontSize:"20px",fontWeight:"bold"}}
                                        onClick={()=>{
                                            dispatch_reducer({type:"CLOSE_PICTURE"})
                                        }}
                                            >
                                            <FontAwesomeIcon size ='1x' icon={faTimesCircle}></FontAwesomeIcon>
                                        </button>
                                </div>
                                <center>
                                <Webcam
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    ref={webRef}
                                    style={{width:"350px",height:"350px"}}
                                />
                                    <br></br>
                                    <Button type="button" color="warning" variant="contained" severity="warning" onClick={() =>
                                                dispatch_reducer({type:"PICTURE_TAKE_AND_SHOW"})
                                            }><FontAwesomeIcon size ='2x' icon={faCameraRetro}></FontAwesomeIcon>
                                    </Button>
                                </center>
                            </TopShadowBar>

                        :
                            <>
                                <TopShadowBar>
                                    <div className='top_bar_with_shadow_class'>
                                         <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>What's your mood </p>
                                     </div>
                                     <center>
                                         <img style={{width:"100%",height:"350px"}} src='data/picture.jpg' alt="picture"/>
                                         <br></br><br></br>
                                         <Button  type="button" color="success" variant="contained" onClick={() =>
                                             dispatch_reducer({type:"TAKE_PICTURE"})
                                         }>Take a Picture
                                         </Button>
                                      </center>
                                 </TopShadowBar>
                            </>

                    }
                    {/* capture video state end */}
                    </div>
                    {(loading)
                    ?
                        <>
                            <div className="_mobile_view" >
                            <TopShadowBar>
                                <div className='top_bar_with_shadow_class'>
                                    <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>
                                    List of Music
                                    </p>
                                    <button type="button" className='btn btn-danger float-right' style={{fontSize:"20px",fontWeight:"bold"}}
                                    >
                                    <FontAwesomeIcon size ='1x' icon={faTimesCircle}></FontAwesomeIcon>
                                    </button>
                                </div>
                                </TopShadowBar>
                                <br></br><br></br>
                                <center>
                                {/* <Box sx={{ width: '100%' }}> */}
                                    <CircularProgress />
                                {/* </Box> */}
                                </center>
                            </div>
                        </>
                    :
                    (emotion)
                    ?
                        <div className="_mobile_view" >
                        <TopShadowBar>
                            <div className='top_bar_with_shadow_class'>
                                <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>
                                List of Music
                                </p>
                            </div>
                            </TopShadowBar>
                                <ListOfMusic />
                        </div>
                    :
                        <div className="_mobile_view" >
                            <TrendingMusic />
                        </div>
                    }

                    </div>
            </div>
        </SideDivForAllComponents>
    </>
  )
};

export default Music;