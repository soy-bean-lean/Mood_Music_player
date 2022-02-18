import React, { useState, useRef } from 'react';
import LogoShow from '../../Dashboard/LogoShow';
import Button from '@mui/material/Button';
import { MAIN_URL,BACKENDURL_SERVER_SONGS_FOR_ADMIN } from '../../../config/urls';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCoverPhoto = ({AUTHORIZATION_TOKEN,data_send_from_url,value_props}) => {
  // console.log(value_props)
  const [load_image, setload_image] = useState(false)
  const [image_file, setimage_file] = useState(null)
  const [disabled_or_enable, updatedisabled_or_enable] = useState(true);
  const notify = () => {

    toast("Cover photo updated")
}
const error_notify = () => {
    toast("provide valid image")
}

  const fileRef = useRef(null);
  const image_size_button = {
    height: "50px",
    width: "50px",
}
const _update_cover_photo = async(c,v)=>{
  console.log(c)
  console.log(v)
  setload_image(true)
  setimage_file(v)
  updatedisabled_or_enable(false)
}
  const _send_new_pic = async() =>{
    const fd = new FormData();
    fd.append('cover_photo', image_file);
        axios.patch(BACKENDURL_SERVER_SONGS_FOR_ADMIN+data_send_from_url+"/", fd, {
          headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
          }
      }).then((response)=>{
        console.log(response)
        updatedisabled_or_enable(true)
        notify()

      }).catch((err)=>{
        console.log(err)
        updatedisabled_or_enable(true)
        setimage_file(null)
        setload_image(false)
        error_notify()
      })
  }
  return (
    <>
      <br></br>
      <b>
        <label>Change cover</label>
      </b>
          <input
            ref={fileRef}
            hidden
            type="file"
            name="cover_photo"
            onChange={(event) => {
                _update_cover_photo("cover_photo", event.target.files[0]);

            }}
        />
        <Button onClick={() => {
            fileRef.current.click();
        }}
        >
        <img style={image_size_button} src={MAIN_URL+"/data/upload_logo_admin.png"} alt="Image"/></Button>
        {(load_image)?
          (image_file)?
            <LogoShow file={image_file}  size="size"/>
            :
            <p>loading .....</p>
        :
          <img src={value_props} alt="_logo_" style={{ borderRadius:"50px",width:"100px",height:"100px"}}/>
        }
      <Button
        type="submit"
        onClick={()=>{
          _send_new_pic()
        }}
        style={{backgroundColor:"#dafb81fc",fontWeight:"bold",marginLeft:"5px"}}
        variant="outlined"
        className="btn"
        disabled={disabled_or_enable}>
          Update cover photo
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
  <br></br>
    </>
  )
}

export default UpdateCoverPhoto