import React , {useRef,useState,useEffect,useReducer} from 'react';
import axios from 'axios'
import {BACKENDURL_FOR_SONGS, MAIN_URL } from '../config/urls'
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

import { useDispatch } from "react-redux"
import { _save_and_play_song_from_list_} from '../features/Pass_data'
import { useNavigate } from "react-router-dom";


const Music = ({AUTHORIZATION_TOKEN}) => {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const webRef = useRef(null);
    const [_capturepicture, set_capturepicture] = useState(false)
    const [image_data,setimage_data] = useState(null)
    const [show_image,set_show_image] = useState(false)
    const [emotion,setemotion] = useState(false)
    const [loading,setloading] = useState(false)
    const [facenotfound,setfacenotfound] = useState(false)
    const [_loading_songs,set_loading_songs] = useState(true)
    const showImage = () =>{
        // console.log(webRef.current.getScreenshot());
        setimage_data(webRef.current.getScreenshot());
        // console.log(image_data)
      }

      let initialState = []

      const reducer = (state,action) => {
        switch(action.type) {
            case "TAKE_PICTURE":
                set_capturepicture(true)
                break
            case "CLOSE_PICTURE":
                set_capturepicture(false)
                set_show_image(false)
                setimage_data(null)
                break
            case "PICTURE_TAKE_AND_SHOW":
                set_show_image(true)
                showImage()
                break
            case "TAKE_ANOTHER_SHOT":
                setimage_data(null)
                set_show_image(false)
                set_capturepicture(true)
                setfacenotfound(false)
                break
            // case "SEND_PICTURE_DATA":
            //     console.log(image_data)
                // break
            case "CLOSE_PLAYER":
                setemotion(null)
                set_capturepicture(false)
                set_show_image(false)
                break
            default:
                return state;
        }
      }
      const [state, dispatch_reducer] = useReducer(reducer, initialState);

        function send_data(){
            setloading(true)
            set_loading_songs(false)
            console.log("call_only_once")
            const image_base64_test = IMAGE_FILE
            let BACKENDURL = BACKENDURL_FOR_SONGS
            axios.post(BACKENDURL,{
                name:"roshan",
                // image:image_data
                image: image_base64_test
            }).then((response) => {
                console.log(response.data)
                dispatch(_save_and_play_song_from_list_(response.data));
                setimage_data(null)
                set_capturepicture(false)
                setemotion(true)
                setloading(false)
                set_loading_songs(true)
                }).catch(err =>{
                  console.log(err)
                  console.log("bad 400")
                  setloading(false)
                  set_capturepicture(true)
                  set_show_image(true)
                  setimage_data(null)
                  setfacenotfound(true)
                  set_loading_songs(true)
                })
            }
return (
    <>
        <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName="Music" URL_TO_GO="Dashboard" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                {/* flexr div */}
                    <div className='div_photo_and_trending'>
                    <div className="_mobile_view">
                        {(_capturepicture)?
                            // if picture taken then show image

                                // This is to take picture open camera and take photo
                                <TopShadowBar>
                                <div className='top_bar_with_shadow_class'>
                                    <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>
                                        {
                                            // if the image isn't good then error or default text
                                        (image_data)?
                                        <>
                                            Wow that was Great shot
                                        </>
                                        :
                                        (facenotfound)?
                                        <>
                                            That was not great shot
                                        </>
                                        :
                                        <>
                                            Take a picture
                                        </>
                                        }
                                    </p>

                                    <button type="button" className='btn btn-danger float-right' style={{fontSize:"20px",fontWeight:"bold"}}
                                    onClick={()=>{
                                        dispatch_reducer({type:"CLOSE_PICTURE"})
                                    }}
                                        >
                                        <FontAwesomeIcon size ='1x' icon={faTimesCircle}></FontAwesomeIcon>
                                    </button>
                                </div>
                               {
                                // if there is image show image and stop webcam
                               (show_image)?
                                        // if there is image after picture taken
                                    (image_data)?
                                    (_loading_songs)?
                                        <>
                                            <center>
                                                <img
                                                    style={{borderRadius:"30px",marginBottom:"10px",marginTop:"10px",width:"350px",hegith:"350px"}}
                                                    src={image_data} alt="image of user"
                                                />
                                                <br></br><Button style={{borderRadius:"30px",marginBottom:"10px"}} type="button" color="info" variant="contained" onClick={() =>
                                                        dispatch_reducer({type:"TAKE_ANOTHER_SHOT"})
                                                    }>Take a Another Shot
                                                    </Button>
                                                    <Button style={{borderRadius:"30px",marginBottom:"10px",marginLeft:"10px"}} type="button" color="success" variant="contained"
                                                    onClick={() =>
                                                        // dispatch_reducer({type:"SEND_PICTURE_DATA"})
                                                        send_data()

                                                    }>Submit
                                                    </Button>
                                            </center>
                                        </>
                                        :
                                        <>
                                        <center>
                                            <CircularProgress />
                                        </center>
                                        </>
                                    :
                                    (facenotfound)?
                                    <center>
                                        <p style={{fontFamily:"cursive",color:"red",fontWeight:"bold"}}>Give another shot</p>
                                        <img style={{borderRadius:"30px",marginBottom:"10px",marginTop:"10px",width:"350px",height:"350px"}} src={MAIN_URL+"/data/thereissomethingswrong.jpg"} alt="There is something wrong" />
                                        <br></br><Button  style={{borderRadius:"30px",marginBottom:"10px"}} type="button" color="info" variant="contained" onClick={() =>
                                            dispatch_reducer({type:"TAKE_ANOTHER_SHOT"})
                                        }>Take a Another Shot
                                        </Button>
                                    </center>
                                    :
                                        <>
                                            <center>
                                                <p style={{fontFamily:"cursive",color:"red",fontWeight:"bold"}}>Wait for second to open a camera</p>
                                                <img style={{borderRadius:"30px",marginBottom:"10px",marginTop:"10px",width:"350px",hegith:"350px"}} src="https://i.giphy.com/media/eeL8EcBBTwSMLACw6F/giphy.webp" alt="There is something wrong" />
                                                <br></br><Button  style={{borderRadius:"30px",marginBottom:"10px"}} type="button" color="info" variant="contained" onClick={() =>
                                                    dispatch_reducer({type:"TAKE_ANOTHER_SHOT"})
                                                }>Take a Another Shot
                                                </Button>
                                            </center>
                                        </>
                                :
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
                                }
                                </TopShadowBar>

                        :
                        (emotion)?
                            <>
                                <TopShadowBar>
                                <div className='top_bar_with_shadow_class'>
                                    <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>
                                        Music is great worksheet
                                    </p>

                                    <button type="button" className='btn btn-danger float-right' style={{fontSize:"20px",fontWeight:"bold"}}
                                    onClick={()=>{
                                        dispatch_reducer({type:"CLOSE_PLAYER"})
                                    }}
                                        >
                                        <FontAwesomeIcon size ='1x' icon={faTimesCircle}></FontAwesomeIcon>
                                    </button>
                                </div>
                                </TopShadowBar>
                                <br></br>
                                   {(loading)?
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                            <br></br>
                                            <LinearProgress />
                                            <br></br>
                                            <LinearProgress />
                                        </Box>
                                        :
                                        <MusicApp />
                                    }
                            </>
                        :
                        // at first page laod then this will load
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
                            </>}
                    </div>
                    {/* capture video state end */}
                    {(emotion)?
                        (loading)?
                            <div className="_mobile_view" >
                                <TopShadowBar>
                                        <div className='top_bar_with_shadow_class'>
                                            <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>
                                            List of Music
                                            </p>
                                        </div>
                                        <CircularProgress />
                                    <ListOfMusic />
                                </TopShadowBar>
                            </div>
                            :
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
                                <TrendingMusic  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                            </div>

                    }
                </div>
            </div>
        </SideDivForAllComponents>
    </>
  )
};

export default Music;