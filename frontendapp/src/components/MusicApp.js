import React , {useEffect,useState}  from 'react';
import './music.css'
import { TopShadowBar } from "../style/TopShadowBar";
import Button from '@mui/material/Button';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Container , Row , Col } from 'react-bootstrap'
import  {SONGS_URL} from '../config/urls'
import {Shimmer } from 'react-shimmer'
import './image.css'

import { useSelector, useDispatch } from "react-redux"
import { _save_and_play_song_from_list_,_delete_and_play_song_from_list_} from '../features/Pass_data'
import ReviewsByUser from './songs/ReviewsByUser';
import jwt_decode from "jwt-decode";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useNavigate } from "react-router-dom";

const MusicApp = ({AUTHORIZATION_TOKEN}) => {
    useEffect(() => {
        document.title = "Music App | Music Mood Player";
      }, [])
    // console.log(_songs_from_server_)
    let navigate = useNavigate();

    const [payment, setpayment] = useState("None");

    const [_songs_name_for_review_, set_songs_name_for_review_] = useState(null)
    const [songs, setsongs] = useState([])
    const [length_of_list, setlength_of_list] = useState(null)
    const [playnow, setplaynow] = useState(0)
    const [show, setshow] = useState(false)
    const [_play_pause_state, set_play_pause_state] = useState(true)
    const [_logo_360_rotate_, set_logo_360_rotate_] = useState(true)
    const [message, setmessage] = useState(false)

    useEffect(() => {
        var decoded = jwt_decode(AUTHORIZATION_TOKEN);
        setpayment(decoded.payment_options)
        console.log(decoded.payment_options)
    }, [AUTHORIZATION_TOKEN])


    const dispatch = useDispatch()
    const _songs_from_server_ = useSelector((state) => state._PASS_LIST_ID_SONGS_.Pass_id_for_song)


    useEffect(()=>{
          if(_songs_from_server_.length>=0){
                setsongs(_songs_from_server_)
                setlength_of_list(songs.length-1)
                setshow(true)
                // console.log("great")
          }else{
                // console.log("not great")
          }
      })
    //   useEffect(()=>{
    //     if(_songs_from_server_.length>0){
    //         setsongs(_songs_from_server_)
    //         setlength_of_list(songs.length-1)
    //         setshow(true)
    //     }else{

    //     }
    // },[songs])

const handleClickNext = () => {
        console.log("next")
        console.log(length_of_list)
        // console.log(SONGS_URL+songs[playnow].song_file)
        console.log(playnow)
        if(length_of_list>playnow){
            setplaynow(playnow+1)
            // console.log(playnow)
        }else{
            setplaynow(0)
        }
    }
    const playnext = () => {
        console.log(length_of_list)
        if(length_of_list>playnow){
            setplaynow(playnow+1)
        }else{
            setplaynow(0)
        }
    }
    const handleClickPrevious = () => {
        console.log("pre : "+playnow)
        if(length_of_list<playnow){
            console.log("if : "+playnow-1)
            setplaynow(playnow-1)
            // console.log(playnow)
        }else{
            console.log("else "+playnow-1)
            setplaynow(0)
        }
      }
    const onPause_call = () =>{
        console.log("pause")
        set_play_pause_state(false)
        set_logo_360_rotate_(false)
    }
    const onPlay_call = () =>{
        console.log("play")
        set_play_pause_state(true)
        set_logo_360_rotate_(true)
        // console.log(songs[playnow].song_name)
        console.log("playnow : "+playnow)
        // console.log(songs[playnow].song_name)
        set_songs_name_for_review_(songs[playnow].id)
    }

  return (
        <>

        {(message)?

            <>
            <br></br>
            <center>
                <h3 style={{color:"red",fontSize:"20px"}}>
                    You need subcription for more time
                </h3>
                <br></br>
                <Button
                variant="contained"
                onClick={()=>{
                    navigate('/payment')
                }}
                >Go for Subscription</Button>
            </center>
            </>

        :
        (show)?

            <TopShadowBar>
            {/* <Container> */}
            <Row>
            <Col lg={12}>
                <div style={{backgroundColor:"rgb(19 204 243)",height:"25px",borderRadius:"10px"}} className='top_bar_with_shadow_class'>
                    <p className="float-left" style={{fontSize:"15px",fontWeight:"bold"}}>
                        {(_play_pause_state)
                            ?
                            <span style={{color:'#efe609'}}>Playing </span>
                            :
                            <span style={{color:'#efe609'}}>Paused </span>
                        }
                        ({songs[playnow].song_name})
                    </p>
                {/* <Button style={{backgroundColor:"rgb(255 9 68)",height:"25px"}} className='float-right' type="button"  variant="contained" severity="warning" onClick={() =>
                    console.log("play")
                }>
                    X
                </Button> */}
                </div>
                            <div style={{borderRadius:"10px",width:"100%",backgroundColor:"rgb(89 194 244)"}}>
                                <div style={{margin:"auto",width:"50%"}}>
                                                {/* this  will check tha payment  */}
                            {(payment=="yearly" || payment == "monthly")?
                                    null
                                :
                                <center>
                                <p
                                    style={{color:"rgb(244 255 161)",fontWeight:"bold",fontSize:"12px"}}
                                >You can listen only for 4 minute.For more Subcription needed</p>
                                <CountdownCircleTimer
                                size={80}
                                isPlaying
                                duration={10}
                                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                colorsTime={[7, 5, 2, 0]}
                                onComplete={() => {
                                    setshow(false)
                                    setmessage(true)
                                }}
                            >
                                {({ remainingTime }) => remainingTime}
                            </CountdownCircleTimer>
                                </center>
                            }
                                    <center>
                                        <img
                                            className={(_logo_360_rotate_)?'image':null}
                                            style={{borderRadius:"50%",width:"200px",height:"200px",padding:"10px"}}
                                            src={SONGS_URL+songs[playnow].cover_photo}
                                            alt="Cover Photo"
                                        />
                                        <p style={{fontWeight:"bold",fontSize:"13px"}}>
                                        <span>Song Name : {songs[playnow].song_name}</span>
                                        {/* <span>Song Name : {songs[playnow].id}</span> */}
                                            <br></br>
                                            <span>Singer : {songs[playnow].song_name}</span>
                                        </p>
                                    </center>
                                </div>
                            </div>

                            <AudioPlayer
                            autoPlay
                                showSkipControls={true}
                                // customAdditionalControls={[]}
                                showJumpControls={true}
                                src={SONGS_URL+songs[playnow].song_file}
                                onClickPrevious={handleClickPrevious}
                                onClickNext={handleClickNext}
                                onPause={onPause_call}
                                onPlay={onPlay_call}
                                onEnded={playnext}
                            />
                        </Col>
                    </Row>
                {/* </Container> */}
            </TopShadowBar>
            :
            <Shimmer width={200} height={200} style={{margin:"auto",width:"50%"}} />
        }
        {(message)?
         null
        :
        (_songs_name_for_review_)
        ?

            <ReviewsByUser
                _SONG_NAME_={_songs_name_for_review_}
                AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                _SONG_ID_={_songs_name_for_review_}
            />
        :
            null
        }
    </>
  )
};

export default MusicApp;
