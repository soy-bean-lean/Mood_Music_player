import React, { useState, useRef , useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from "../TopBar";
import { TopShadowBar } from '../../style/TopShadowBar';

import { useSelector } from "react-redux"
import { _save_data_,_update_save_data_} from '../../features/ProfileData'
import CircularProgress from '@mui/material/CircularProgress';
import LogoShow from '../Dashboard/LogoShow'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios'
import { MAIN_URL , BACKEND_POST_NEW_PROFILE , GET_PROFILE_PICTURE } from '../../config/urls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormUpdate from './FormUpdate';
import PasswordSet from './PasswordSet';

const DashboardData = ({AUTHORIZATION_TOKEN,_title_of_profile_data_,_proflile_pic_}) => {
    const fileRef = useRef(null);
    const SUPPORTED = ["image/jpg", "image/jpeg", "image/png"];
    const _profile_data_ = useSelector((state) => state._PROFILE_DATA_.ProfileData)
    const [show, setShow] = useState(true);
    const notify = () => toast("profile pic updated");

    // console.log(_profile_data_.length)
    const CheckFile = Yup.object().shape({
        file: Yup
            .mixed()
            .nullable()
            .required("Choose a picture first")
            .test(
                "FILE_SIZE",
                "Uploaded file is too big",
                (value) => !value || (value && value.size <= 1024 * 1024))
            .test(
                "FILE_FORMAT",
                "File isn't supported",
                (value) => !value || (value && SUPPORTED.includes(value?.type)),
            )
    });
    const image_size_button = {
        height: "50px",
        width: "50px",
    }

  return (
        <SideDivForAllComponents>
        <div className="_side_component_">
            <TopBar TopBarName="DashBoard" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>

            {/* flexr div */}
                <div className='div_photo_and_trending'>
                    <div className="_mobile_view">
                            <TopShadowBar >
                                <div className='top_bar_with_shadow_class' style={{backgroundColor:'#9099fb'}}>
                                    <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>{_proflile_pic_}</p>
                                </div>
                                <center>
                                    {(_profile_data_.length>0)?
                                        <>
                                        <Formik
                                            initialValues={{
                                                file:null,
                                                id:_profile_data_[0]["id"],
                                                added:null,
                                            }}
                                            validationSchema={CheckFile}
                                            onSubmit={(values,actions) => {
                                                actions.setStatus(undefined);
                                                const fd = new FormData();
                                                console.log(values.id)
                                                fd.append('profile_pic', values.file);
                                                axios.patch(BACKEND_POST_NEW_PROFILE+values.id+"/",fd,{
                                                    headers: {
                                                    'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
                                                    }},{
                                                    headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                    }
                                                }).then((resr) => {
                                                    // console.log(resr)
                                                    // if(resr)
                                                    // {
                                                    //     actions.setStatus({
                                                    //         added: 'profile updated'
                                                    //         });
                                                    // }
                                                    notify()
                                                }).catch(err => {
                                                    // console.log(err)
                                                        actions.setStatus({
                                                            file: "there was some problem"
                                                            });
                                                })
                                            }}
                                        >
                                            {({values,errors,status,setFieldValue}) =>(
                                                <Form>
                                                    {values.file?
                                                            <LogoShow file={values.file} />
                                                        :
                                                            <img src={GET_PROFILE_PICTURE+_profile_data_[0]["profile_pic"]} alt="profile pic" style={{
                                                                borderRadius:"50px",width:"200px",height:"200px"
                                                            }}/>
                                                    }
                                                    {/* <input type="hidden" value={_profile_data_[0]["id"]} name="id" /> */}
                                                    <input
                                                        ref={fileRef}
                                                        hidden
                                                        type="file"
                                                        name="file"
                                                        onChange={(event) => {
                                                            setFieldValue("file", event.target.files[0]);
                                                        }}
                                                    />
                                                    <br></br>
                                                     <b><label className="fw-bold">Upload New pic</label></b>
                                                    <Button onClick={() => {
                                                        fileRef.current.click();
                                                    }}
                                                    ><img style={image_size_button} src={MAIN_URL+'/data/_upload_logo.png'} alt="Image"/></Button>

                                            {errors.file?
                                                    <>
                                                    <br></br> <br></br>
                                                    <Alert variant="filled" severity="error" sx={{width: '60%', margin: "auto" }}>{errors.file}</Alert>
                                                    </>
                                            :
                                                    null
                                            }
                                                {status && status.file ? (
                                                    <small style={{color:'red',fontSize:"15px",fontWeight:"bold"}} className="form-text">{status.file}</small>
                                                ) : (null)}
                                                {/* {status && status.added ? (
                                                <small style={{fontSize:"15px",fontWeight:"bold"}} className="form-text text-success">{status.added}</small>
                                                ) : (null)} */}
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
                                                />
                                            <center>
                                                    <Button variant="contained" style={{marginTop:"20px"}} color="success" type="submit">update pic</Button>
                                            </center>
                                                </Form>
                                            )}
                                        </Formik>
                                        </>
                                    :
                                    <center>
                                    <p style={{fontWeight:"bold",fontFamily:"cursive",color:"red",fontSize:"15px"}}>Wait for second ....</p>
                                        <CircularProgress />
                                    </center>
                                    }
                                </center>
                            </TopShadowBar>
                        </div>


                        <div className="_mobile_view" >
                            <TopShadowBar >
                                    <div className='top_bar_with_shadow_class' style={{backgroundColor:'#9099fb'}}>
                                        <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>{_title_of_profile_data_}</p>
                                    </div>
                                    <center>
                                    {(_profile_data_.length>0)?
                                                <>
                                                    <FormUpdate
                                                        AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                                                        datatypeprops="email"
                                                        id__type="emailid"
                                                        value_props={_profile_data_[0]["email"]}
                                                        id_of_user={_profile_data_[0]["id"]}
                                                        label_name="E-mail"
                                                        name_of_type="email"
                                                    />
                                                    <FormUpdate
                                                        AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                                                        datatypeprops="text"
                                                        id__type="firstid"
                                                        value_props={_profile_data_[0]["first"]}
                                                        id_of_user={_profile_data_[0]["id"]}
                                                        label_name="First Name"
                                                        name_of_type="first"
                                                    />
                                                    <FormUpdate
                                                        AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}
                                                        datatypeprops="text"
                                                        id__type="lastid"
                                                        value_props={_profile_data_[0]["last"]}
                                                        id_of_user={_profile_data_[0]["id"]}
                                                        label_name="Last Name"
                                                        name_of_type="last"
                                                    />
                                                </>
                                    :
                                    <center>
                                        <p style={{fontWeight:"bold",fontFamily:"cursive",color:"red",fontSize:"15px"}}>Wait for second ....</p>
                                        <CircularProgress />
                                    </center>
                                    }
                                    </center>
                            </TopShadowBar>
                        </div>
                        <TopShadowBar style={{width:"45%"}}>
                                <div className='top_bar_with_shadow_class' style={{backgroundColor:'#9099fb'}}>
                                    <p className="float-left" style={{fontSize:"20px",padding:"5px",fontWeight:"bold"}}>Password</p>
                                </div>
                                    <PasswordSet AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN} />
                        </TopShadowBar>
            </div>
        </div>
    </SideDivForAllComponents>
  )
}

export default DashboardData