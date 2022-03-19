import React, { useState, useRef } from 'react';
import { SideDivForAllComponents } from '../../../style/SideDivForAllComponents';
import TopBar from "../../TopBar";
import './style.css'
import { Formik, Form, Field } from 'formik';
import LogoShow from '../../Dashboard/LogoShow';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { MAIN_URL,BACKENDURL_SERVER_SONGS_FOR_ADMIN } from '../../../config/urls';
import axios from 'axios'
import Select_options from "./Select_options";

const AddSongs = ({ AUTHORIZATION_TOKEN }) => {
    const fileRef = useRef(null);
    const [_close_alert, set_close_alert] = useState(true)
    const [loading, setloading] = useState(false)
    const [success_show, setsuccess_show] = useState(null)

    const image_size_button = {
        height: "50px",
        width: "50px",
    }
    const options = [
        {value:"angry",label:"Angry"},
        {value:"happy",label:"Happy"},
        {value:"fear",label:"Fear"},
        {value:"disgust",label:"Disgust"},
        {value:"neutral",label:"Neutral"},
        {value:"sad",label:"Sad"},
        {value:"surprise",label:"Surprise"},
    ]
    function close_alert(){
    setsuccess_show(null)}
    return (
<SideDivForAllComponents>
    <div className="_side_component_">
        <TopBar TopBarName="AddSongs" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />

        <div className="inner_div">
            <div style={{width:"70%",margin:"auto",backgroundColor:'#fff5f5'}}>
            <Formik
                //song_name song_irsc artist_name  song_file cover_photo  category
                initialValues={{
                    song_name:'',
                    song_irsc:'',
                    artist_name:'',
                    song_file:'',
                    cover_photo: null,
                    category:'',
                    esong_name: '',
                    esong_irsc: '',
                    eartist_name: '',
                    esong_file: '',
                    ecover_photo:'',
                    ecategory:'',
                    successadded:'',
                }}
                onSubmit={(values, actions) => {
                    // console.log(values)
                    setloading(true)
                    actions.setStatus(undefined);
                    const fd = new FormData();
                    fd.append('song_name', values.song_name);
                    fd.append('song_irsc',values.song_irsc);
                    fd.append('artist_name', values.artist_name);
                    fd.append('song_file', values.song_file);
                    fd.append('cover_photo', values.cover_photo);
                    fd.append('category', values.category);
                    axios.post(BACKENDURL_SERVER_SONGS_FOR_ADMIN, fd, {
                        headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
                        }
                    }).then((resr) => {
                        // console.log(resr);
                            setloading(false)
                            // set_close_alert(true)
                            // actions.setStatus({
                            //     successadded: "Songs Added"
                            //     });
                            setsuccess_show("Songs Added")
                    }).catch(err => {
                    // eartist_name
                    // esong_file

                    if(err.response.data.category){
                        set_close_alert(true)
                        actions.setStatus({
                            ecategory: err.response.data.category
                            });
                        }
                    if(err.response.data.cover_photo){
                        set_close_alert(true)
                        actions.setStatus({
                            ecover_photo: err.response.data.cover_photo
                            });
                        }
                    if(err.response.data.song_file){
                        set_close_alert(true)
                        actions.setStatus({
                            esong_file: err.response.data.song_file
                            });
                        }
                    if(err.response.data.artist_name){
                        set_close_alert(true)
                        actions.setStatus({
                            eartist_name: err.response.data.artist_name
                            });
                        }
                        if(err.response.data.song_irsc){
                            set_close_alert(true)
                            actions.setStatus({
                                esong_irsc: err.response.data.song_irsc
                                });
                            }
                        if(err.response.data.song_name){
                            set_close_alert(true)
                            actions.setStatus({
                                esong_name: err.response.data.song_name
                              });
                            }
                            // esong_irsc
                            setloading(false)

                    })
                }}
            >
                 {({ values, errors,status, touched,setFieldValue }) => (
                    (loading)?
                        <>
                        <center>
                            <img style={{borderRadius:"50px",width:"250px",height:"250px"}} src={MAIN_URL+"/data/uploading.webp"} alt="uploading ...." />
                            <br></br>
                            <br></br>
                            <p style={{fontWeight:"bold"}}>uploading ....</p>
                        </center>
                        </>
                    :
                    <Form autoComplete='off'>
                        {(success_show)?
                            <Alert variant="filled" onClose={() => {close_alert()}} severity="success" sx={{ width: '50%', margin: "auto" }}>{success_show}</Alert>
                            :
                            null
                        }
                        {status && status.successadded ? (
                            <Alert variant="filled" onClose={() => {set_close_alert()}} severity="success" sx={{ width: '50%', margin: "auto" }}>{status.successadded}</Alert>
                        ) : (null)}
                        <b><label className="fw-bold">Song Name </label></b>
                        <Field name="song_name" type="text" placeholder="Song Name" className="form-control" /><br></br>

                        {status && status.esong_name ? (
                        _close_alert?
                            <Alert onClose={() => {set_close_alert(false)}} variant="filled" severity="error" sx={{ width: '50%', margin: "auto" }}>{status.esong_name}</Alert>
                            :
                        null
                        ) : (null)}
                        <b><label className="fw-bold">Song IRSC </label></b>
                        <Field name="song_irsc" type="text" placeholder="Song IRSC" className="form-control" />
                        <label style={{color:"red",fontFamily:"monospace",fontWeigth:"bold"}}>Must be eg. JDI-99KK </label><br></br>

                        {status && status.esong_irsc ? (
                        _close_alert?
                            <Alert onClose={() => {set_close_alert(false)}} variant="filled" severity="error" sx={{ width: '50%', margin: "auto" }}>{status.esong_irsc}</Alert>
                            :
                        null
                        ) : (null)}

                        <b><label className="fw-bold">Artist Name </label></b>
                        <Field name="artist_name" type="text" placeholder="Artist Name" className="form-control" />

                        {status && status.eartist_name ? (
                        _close_alert?
                            <Alert onClose={() => {set_close_alert(false)}} variant="filled" severity="error" sx={{ width: '50%', margin: "auto" }}>{status.eartist_name}</Alert>
                            :
                        null
                        ) : (null)}
                        <br></br>
                        <b><label className="fw-bold">Song</label></b><br></br>
                        <input
                            style={{width:"60%"}}
                            id="image-input"
                            name="song_file"
                            type="file"
                            placeholder="Song"
                            className="form-control"
                            onChange={(event) => {
                                setFieldValue("song_file", event.target.files[0]);
                            }}
                        />
                        <label style={{color:"red",fontFamily:"monospace",fontWeigth:"bold"}}>Must be in mp3 or audio file</label><br></br>


                        {status && status.esong_file ? (
                        _close_alert?
                            <Alert onClose={() => {set_close_alert(false)}} variant="filled" severity="error" sx={{ width: '50%', margin: "auto" }}>{status.esong_file}</Alert>
                            :
                        null
                        ) : (null)}

                        <br></br>
                        <b><label className="fw-bold">Cover Photo</label></b><br></br>
                        <input
                            ref={fileRef}
                            hidden
                            type="file"
                            name="cover_photo"
                            onChange={(event) => {
                                setFieldValue("cover_photo", event.target.files[0]);
                            }}
                        />
                        <Button onClick={() => {
                            fileRef.current.click();
                        }}
                        ><img style={image_size_button} src={MAIN_URL+"/data/upload_logo_admin.png"} alt="Image"/></Button>

                        {values.cover_photo && <LogoShow file={values.cover_photo} size="size"/>}

                        {status && status.ecover_photo ? (
                        _close_alert?
                            <Alert onClose={() => {set_close_alert(false)}} variant="filled" severity="error" sx={{ width: '50%', margin: "auto" }}>{status.ecover_photo}</Alert>
                            :
                        null
                        ) : (null)}
                        <br></br><br></br>
                        <Select_options
                            options_value={options}
                            value={values.category}
                            onChange={value=>setFieldValue('category',value.value)}
                        />
                        <br></br>
                        {status && status.ecategory ? (
                        _close_alert?
                            <Alert onClose={() => {set_close_alert(false)}} variant="filled" severity="error" sx={{ width: '50%', margin: "auto" }}>{status.ecategory}</Alert>
                            :
                        null
                        ) : (null)}
                        <br></br>
                        <br></br>
                            <center>
                                <Button variant="contained" color="success" type="submit">Save Data</Button>
                            </center>
                    </Form>
                )}
            </Formik>

            </div>
        </div>

    </div>
</SideDivForAllComponents>
    )
}

export default AddSongs