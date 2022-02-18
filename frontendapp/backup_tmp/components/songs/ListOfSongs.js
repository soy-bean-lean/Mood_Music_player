import React ,{useEffect,useState} from 'react';
import { SongsListCategory } from '../../style/Listofsongs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeadphonesAlt,faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import TextField from '@mui/material/TextField';
import { BACKENDURL_SERVER_SONGS } from '../../config/urls';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector, useDispatch } from "react-redux"
import { _save_songs_ } from  '../../features/Songs'

import { useNavigate } from "react-router-dom";

const ListOfSongs = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    let _songs_list_to_show_ = []
    let _songs_ = [
        {
            "artist_name": "...",
            "category": "...",
            "cover_photo": "...",
            "song_file": "....",
            "song_irsc": "....",
            "song_name": ".....",
        }
    ]
    const [loading,setloading] = useState(true)
    const [_empty_data_,set_empty_data_] = useState(false)

    _songs_list_to_show_ = useSelector((state) => state._SONGS_._song_list_)
    let _next_page_ = useSelector((state) => state._SONGS_._song_list_.next)
    let _previous_page_ = useSelector((state) => state._SONGS_._song_list_.previous)
    // console.log(_next_page_)
    // console.log(_previous_page_)

    const _data_from_server_ = async (url) => {

        await axios.get(url).then((resp)=>{
            // console.log(resp.data[0]["song_name"])
            // console.log(resp.data)
            setloading(false)
            console.log(resp.data.count)
            if(resp.data.count==0){
                console.log("empty")
                set_empty_data_(true)
            }else{
                set_empty_data_(false)
            }
            dispatch(_save_songs_(resp.data));
            // setdata(resp.data)
        }).catch((err)=>{
            console.log(err.response.data)
            setloading(false)
            // setdata(err.response.data)
        })
      }
    //   if(_next_page_ ===null || _next_page_ === undefined){
    //     //nothing
    //   }else{
    //     console.log(_next_page_)
        // const params = new URL(_next_page_).searchParams;
        // console.log(params.get('load_data'))
    //   }
    useEffect(()=>{
        _data_from_server_(BACKENDURL_SERVER_SONGS)
    },[])

    _songs_ = _songs_list_to_show_.results

    const _previous_page = () => {
        console.log("previus")
        _data_from_server_(_previous_page_)
    }
    const _next_page = () => {
        _data_from_server_(_next_page_)
    }
const _search_parameter= (e) => {
    // console.log(e.target.value)
    // console.log(BACKENDURL_SERVER_SONGS+"?search="+e.target.value)
    _data_from_server_(BACKENDURL_SERVER_SONGS+"?search="+e.target.value)
}

  return (
    <>
    {(loading)?
        <>
            <div style={{marginTop:"10%"}}>
                <LinearProgress color="secondary" />
            </div>
            <div style={{marginTop:"10%"}}>
                <LinearProgress color="secondary" />
            </div>
            <div style={{marginTop:"10%"}}>
                <LinearProgress color="secondary" />
            </div>
            <div style={{marginTop:"10%"}}>
                <LinearProgress color="secondary" />
            </div>
        </>
        :
        <SongsListCategory>
            <div className="_div_down_bar_song_list">
                <center><TextField
                            style={{width:"70%",margin:"10px"}}
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            onChange={(e)=>{
                                // console.log(e.target.value)
                                _search_parameter(e)
                            }}
                        />
                </center>

            {(_empty_data_)?
                <center>
                    <p style={{color:"red",fontWeight:"bold"}}>Not found</p>
                    <img
                        src="https://media1.giphy.com/media/J4Kht6IWPBGCyNE1Xg/giphy.gif?cid=ecf05e47imdysn9s80ii464rkwch19tcr70u5xb5nm9u4xy3&rid=giphy.gif&ct=g"
                    />
                </center>
            :
            (_songs_list_to_show_.length>=0)?
            <center>
                <CircularProgress />
            </center>
            :
                (_songs_.length<0)
                ?
                <center>
                    <CircularProgress />
                </center>
                :
                    (_songs_.map((item,index)=>{
                        return (
                            <div key={index} style={{margin:"2px",backgroundColor:"rgb(212 234 237)",padding:"10px",borderRadius:"30px"}}>
                                <button
                                    className='songs_play_button'
                                    onClick={() => navigate('playsongs/'+item.song_name)}

                                >
                                    <FontAwesomeIcon size='1x' icon={faHeadphonesAlt}></FontAwesomeIcon>
                                </button>
                                <img
                                    src={item.cover_photo}
                                    style={{borderRadius:"50px",height:"50px",width:"50px",marginLeft:"5px"}}
                                />
                                <span style={{marginLeft:"4px",fontWeight:"bold",fontFamily:"monospace"}}>({item.song_name})</span>
                                <span style={{marginLeft:"10px",fontWeight:"bold",fontFamily:"monospace"}}>({item.artist_name})</span>
                            </div>
                        )
                    }))
            }

                <hr></hr>
                    <center>
                    {(_previous_page_)?
                        <button
                            onClick={()=>{
                                _previous_page()
                            }}
                            className='button_category'
                            >
                            <FontAwesomeIcon  icon={faChevronLeft}></FontAwesomeIcon>
                        </button>
                        :
                        <button
                            className='button_category_disabled'
                            disabled
                            >
                            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                        </button>
                        }
                        {/* <span>Page no</span> */}

                        {(_next_page_)
                        ?
                        <button
                            onClick={()=>{
                                _next_page()
                            }}
                            className='button_category'
                            >
                            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </button>
                        :
                            <button
                                className='button_category_disabled'
                                disabled
                                >
                                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </button>
                        }

                    </center>
                <hr></hr>
            </div>
        </SongsListCategory>
    }
    </>
  )
};

export default ListOfSongs;
