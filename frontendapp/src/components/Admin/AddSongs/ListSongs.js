import React, { useState, useRef, useEffect } from 'react';
import { SideDivForAllComponents } from '../../../style/SideDivForAllComponents';
import TopBar from "../../TopBar";
import { BACKENDURL_SERVER_SONGS_FOR_ADMIN } from '../../../config/urls';
import axios from 'axios'
import { MAIN_URL , GET_PROFILE_PICTURE} from '../../../config/urls';
import './Songslist.css'
import { useNavigate } from "react-router-dom";
import { SongsListCategory } from '../../../style/Listofsongs'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight,faChevronLeft , faTrash } from "@fortawesome/free-solid-svg-icons";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListSongs = ({AUTHORIZATION_TOKEN}) => {
    let navigate = useNavigate();
    const notify_deleted = (data) => toast(data+" deleted");

    const [songslist, setsongslist] = useState([])
    const [next, setnext] = useState(null)
    const [previous, setprevious] = useState(null)
    const [loading, setloading] = useState(false)
    const [load_again, setload_again] = useState(1)

    const _data_from_server_ = async (url) => {

        await axios.get(url,{
            headers:{
                'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
            }
        }).then((resp)=>{
            // console.log("Next : "+resp.data.next)
            // console.log("Previous  : "+resp.data.previous)
            setnext(resp.data.next)
            setprevious(resp.data.previous)
            setsongslist(resp.data.results)
            setloading(false)
        }).catch((err)=>{
            // console.log(err.response)
            setloading(true)
        })
      }
      const _delete_song_ = async (url) => {

        await axios.delete(url,{headers:{
            'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
        }}).then((resp)=>{
            // console.log(resp.data.next)
            setload_again(Math.random())
        }).catch((err)=>{
            // console.log(err.response)
        })
      }

      useEffect(() => {
        setloading(true)
        _data_from_server_(BACKENDURL_SERVER_SONGS_FOR_ADMIN)
    }, [load_again])
    useEffect(() => {
        setloading(true)
        _data_from_server_(BACKENDURL_SERVER_SONGS_FOR_ADMIN)
    }, [])
    const _previous_page = () => {
        // console.log("previus")
        _data_from_server_(previous)
    }
    const _next_page = () => {
        // console.log("test")
        // console.log(next)
        _data_from_server_(next)
    }
    const _search_parameter= (e) => {
        _data_from_server_(BACKENDURL_SERVER_SONGS_FOR_ADMIN+"?search="+e.target.value)
    }
    const delete_song= (data) => {
        // console.log(data)
        _delete_song_(BACKENDURL_SERVER_SONGS_FOR_ADMIN+data+"/")
        notify_deleted(data)
    }
  return (
    <>
    <SideDivForAllComponents>
        <div className="_side_component_">
            <TopBar TopBarName="List of Songs" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />
            <center>
                <TextField
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
            <div className="inner_div">
                <div style={{width:"100%",padding:"10px",margin:"auto",backgroundColor:'#fff5f5'}}>
                    {(loading)?
                        <>
                        <center>
                            <img style={{borderRadius:"50px",width:"250px",height:"250px"}} src={MAIN_URL+"/data/_loading_songs.gif"} alt="uploading ...." />
                            <br></br>
                            <br></br>
                            <p style={{fontWeight:"bold"}}>Loading Data ....</p>
                        </center>
                        </>
                    :
                     <>
                     {(songslist.length>0)?
                        (songslist)?
                            <>

                            <div className="songs-container">
                                {songslist.map((song,index) =>{
                                    // {console.log(song)}
                                    return (
                                                    <div key={index+1} style={{width:"350px"}}>
                                                        <button className='btn_none' onClick={()=>{
                                                                navigate("update/"+song["id"])
                                                        }}>
                                                        <div className='innderflex'>
                                                            <div>
                                                                <h5 style={{fontSize:"20px",fontWeight:"bold",padding:"10px"}}>{song["song_name"].slice(0,6)}....</h5>
                                                                <p style={{fontSize:"15px",padding:"10px"}}>{song["artist_name"].slice(0,12)}</p>

                                                            </div>
                                                            <div>
                                                                <img style={{width:"100px",height:"100px",borderRadius:"30px"}} src={song["cover_photo"]} alt="cover_page" />
                                                            </div>
                                                        </div>
                                                        </button>
                                                        <button
                                                        className='btn_none float-right'
                                                        onClick={()=>{
                                                            delete_song(song["id"])
                                                        }}
                                                        >
                                                            <FontAwesomeIcon size={'1x'} style={{color:'red'}} icon={faTrash}></FontAwesomeIcon>
                                                        </button>
                                                    </div>
                                            )
                                })

                                }
                            </div>
                            <SongsListCategory>
                                <center>
                                    {(previous)?
                                        <button
                                        onClick={()=>{
                                            _previous_page()
                                        }}
                                        className='button_category'
                                        >
                                        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                                        </button>
                                        :
                                        <button
                                        className='button_category_disabled'
                                        disabled
                                        >
                                        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                                        </button>

                                    }
                                    {(next)?
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
                              </SongsListCategory>
                            </>
                            :
                            <p>Load some data first ......</p>
                        :
                        <center>
                            <p><b>Not Found</b></p>
                            <img style={{width:"400px",height:"400px",borderRadius:"30px"}} src={GET_PROFILE_PICTURE+"/admin_data_not_found.gif"} alt="data not found" />
                        </center>
                    }
                     </>
                    }
                </div>
            </div>

            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              toastStyle={{ backgroundColor: "#f97272",color:'white' }}
            />
        </div>
    </SideDivForAllComponents>
    </>
  )
}

export default ListSongs