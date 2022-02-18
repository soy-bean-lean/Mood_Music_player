import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MAIN_URL,BACKENDURL_SERVER_SONGS_FOR_ADMIN } from '../../../config/urls';

const UpdateSong = ({AUTHORIZATION_TOKEN,data_send_from_url,value_props}) => {
    const [disabled_or_enable, updatedisabled_or_enable] = useState(true);
    const [song_file, setsong_file] = useState(null)

    const notify = () => {
      toast("song updated")
  }

  const error_notify = () => {
      toast("Provide valid song file")
  }
    const _send_song_ = async(c,v) =>{
        // console.log(c)
        // console.log(v)
        setsong_file(v)
        updatedisabled_or_enable(false)
    }
const _send_new_song = async() =>{
    const fd = new FormData();
    fd.append('song_file', song_file);
        axios.patch(BACKENDURL_SERVER_SONGS_FOR_ADMIN+data_send_from_url+"/", fd, {
          headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
          }
      }).then((response)=>{
        // console.log(response)
        updatedisabled_or_enable(true)
        notify()

      }).catch((err)=>{
        // console.log(err)
        updatedisabled_or_enable(true)
        setsong_file(null)
        error_notify()
      })
}
  return (
    <>
    <b><label className="fw-bold">Update Song</label></b><br></br>
        <input
            style={{width:"60%"}}
            id="image-input"
            name="song_file"
            type="file"
            placeholder="Song"
            className="form-control"
            onChange={(event) => {
                _send_song_("song_file", event.target.files[0]);
            }}
        />
    <label style={{color:"red",fontFamily:"monospace",fontWeigth:"bold"}}>Must be in mp3 or audio file</label><br></br>
        <br></br>
        <Button
            type="submit"
            onClick={()=>{
                _send_new_song()
            }}
            style={{backgroundColor:"#dafb81fc",fontWeight:"bold",marginLeft:"5px"}}
            variant="outlined"
            className="btn"
            disabled={disabled_or_enable}>
                Update Song
      </Button>
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
          toastStyle={{ backgroundColor: "#d1ffcf" }}
      />
    </>
  )
}

export default UpdateSong