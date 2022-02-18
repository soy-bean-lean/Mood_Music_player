import React , { useEffect , useState} from 'react';
import { useParams } from 'react-router-dom'
import { SideDivForAllComponents , SongsParagraph} from '../../style/SideDivForAllComponents';
import TopBar from '../TopBar';
import { SongsListCategory } from '../../style/Listofsongs'
// import ButtonCategoryLink from './ButtonCategoryLink'
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';
import { BACKENDURL_SERVER_SONGS } from '../../config/urls';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { TopShadowBar } from '../../style/TopShadowBar';
import ReviewsByUser from './ReviewsByUser';

const SingleMusicPlay = ({AUTHORIZATION_TOKEN}) => {
    let navigate = useNavigate();
    // console.log(BACKENDURL_SERVER_SONGS)
    let  {name} = useParams()
    // console.log(name)
    const [_songs_to_play_, set_songs_to_play_] = useState(null)
    const [play_pause_state, set_play_pause_state] = useState("Playing")
    const [_logo_360_rotate_, set_logo_360_rotate_] = useState(false)
    const _data_from_server_ = async (url) => {

        await axios.get(url,{headers:{
            'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
        }}).then((resp)=>{
            // console.log(resp.data.category)
            // console.log(resp.data.cover_photo)
            // console.log(resp.data.song_name)
            // console.log(resp.data.artist_name)
            set_songs_to_play_(resp.data)
        }).catch((err)=>{
            console.log(err)
        })
      }
    useEffect(() => {
        _data_from_server_(BACKENDURL_SERVER_SONGS+name+"/")
    }, [])
    const onPause_call = () =>{
        console.log("pause")
        set_play_pause_state("Pause")
        set_logo_360_rotate_(false)
    }
    const onPlay_call = () =>{
        console.log("play")
        set_play_pause_state("Playing")
        set_logo_360_rotate_(true)
    }
    // const _center_div_ ={
    //     margin:'auto',
    //     width:"50%",
    // }
  return (
    <>
    <SideDivForAllComponents>
           <div className="_side_component_">
               <TopBar TopBarName={
                                    (play_pause_state)
                                    ?
                                        play_pause_state+": "+name
                                    :
                                        play_pause_state+": "+name
                                    } URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                                    />
               <button
                className='btn btn-danger'
                style={{borderRadius:"50px"}}
                onClick={() => navigate('/Songs')}
               >
                <FontAwesomeIcon
                    size='1x'
                    icon={faStepBackward}
                >
                </FontAwesomeIcon>
               </button>
               <div className="_div_button_">
                   {/* <SongsListCategory> */}
                       {/* <p>{name}</p> */}
                       {(_songs_to_play_)
                        ?
                        <>
                        <TopShadowBar>
                        <div style={{borderRadius:"10px",margin:"10px",backgroundColor:"#bcdaff"}}>
                            {/* <div style={_center_div_}> */}
                                <center>
                                <img
                                    src={_songs_to_play_.cover_photo}
                                    alt="cover Photo"
                                    className={(_logo_360_rotate_)?'image':null}
                                    style={
                                        {   padding:"20px",
                                            borderRadius:"50%",
                                            width:"200px",
                                            height:"200px"
                                        }
                                    }
                                />
                                <SongsParagraph>
                                    <div className='Paragraph_style_for_song_name' >
                                        <p  className='song_details_stlye'>
                                            Category : {_songs_to_play_.category}
                                        </p>
                                        <p className='song_details_stlye'>
                                            Song : {_songs_to_play_.song_name}
                                        </p>
                                        <p className='song_details_stlye'>
                                            Singer : {_songs_to_play_.artist_name}
                                        </p>
                                    </div>
                                </SongsParagraph>
                                </center>
                            {/* </div> */}
                            <AudioPlayer
                                autoPlay
                                customAdditionalControls={[]}
                                showJumpControls={false}
                                src={_songs_to_play_.song_file}
                                customAdditionalControls={[]}
                                showJumpControls={true}
                                onPause={onPause_call}
                                onPlay={onPlay_call}
                            />
                        </div>
                        </TopShadowBar>
                            <ReviewsByUser _SONG_NAME_={_songs_to_play_.song_name} AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                        </>
                        :
                        <>
                        <div style={{margin:"20px"}}>
                        <center>
                            <CircularProgress disableShrink />
                        </center>
                        </div>
                        <div style={{margin:"20px"}}>
                        <center>
                            <CircularProgress disableShrink />
                        </center>
                        </div>
                        <div style={{margin:"20px"}}>
                            <center>
                                <CircularProgress disableShrink />
                            </center>
                        </div>
                        </>
                        }
                   {/* </SongsListCategory> */}
               </div>
           </div>
       </SideDivForAllComponents>
   </>
  )
};

export default SingleMusicPlay;

