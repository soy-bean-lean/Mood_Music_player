import React , {useState} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  BACKENDURL_SERVER_SONGS_FOR_ADMIN } from '../../../config/urls';

const UpdateEdit = ({data_send_from_url,name_of_type,AUTHORIZATION_TOKEN,datatypeprops,value_props,uuid_of_song,label_name}) => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const [valuedata,setvalue] = useState(value_props)
    // const [model_to_send,setmodel_to_send] = useState(name_of_type)
    const [disabled_or_enable, updatedisabled_or_enable] = useState(true);
    const notify = () => {

        toast(label_name+ " updated")
    }
    const error_notify = (error_from_server) => {

        toast(error_from_server)
    }

    const onSubmit = (data) =>{
        axios.patch(BACKENDURL_SERVER_SONGS_FOR_ADMIN+data_send_from_url+"/",data,{
            headers: {
            'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
            }}).then((resr) => {
                updatedisabled_or_enable(true)
                notify()
        }).catch(err => {
            // console.log(err.response.data)
            if(err.response.data[name_of_type]){
            error_notify(err.response.data[name_of_type][0])}

            updatedisabled_or_enable(true)
        })
    };
    function call_after_change(_data_edited_){
        setvalue(_data_edited_)
        // console.log(_data_edited_)
        updatedisabled_or_enable(false)
      }
  return (
    <>
    <div style={{marginTop:"10px"}}>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                <TextField
                    type={datatypeprops}
                    name={name_of_type}
                    className="form-control float-left"
                    id={datatypeprops}
                    autoComplete="off"
                    value={valuedata?valuedata:""}
                    {...register(name_of_type, {
                    // maxLength:30,
                    })}
                    label={label_name}
                    onChange={(e) => call_after_change(e.target.value)}
                />
                <br></br><br></br><br></br>
                <Button type="submit" style={{backgroundColor:"#dafb81fc",fontWeight:"bold"}} variant="outlined"  className="btn" disabled={disabled_or_enable}>Update {label_name}</Button>
    </form>

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
    </div>
    </>
  )
}

export default UpdateEdit