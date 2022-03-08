import React , {useState} from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {  BACKEND_POST_NEW_PROFILE } from '../../config/urls';

const FormUpdate = ({name_of_type,id__type,AUTHORIZATION_TOKEN,datatypeprops,value_props,id_of_user,label_name}) => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const [valuedata,setvalue] = useState(value_props)
    const [disabled_or_enable, updatedisabled_or_enable] = useState(true);
    const [serverResponse, UserverResponse] = useState(null);

    const onSubmit = (data) =>{
        axios.patch(BACKEND_POST_NEW_PROFILE+id_of_user+"/",data,{
            headers: {
            'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
            }}).then((resr) => {
                updatedisabled_or_enable(true)
                toast(label_name+ " updated")
        }).catch(err => {
            console.log(err.response.data)
            if(err.response.data["email"]){
                toast.error(err.response.data["email"][0])
        }
            if(err.response.data["first_name"]){
                toast.error(err.response.data["first_name"][0])
        }
            if(err.response.data["last_name"]){
            toast.error(err.response.data["last_name"][0])
        }
            updatedisabled_or_enable(true)
        })
    };
    function call_after_change(_data_edited_){
        setvalue(_data_edited_)
        console.log(_data_edited_)
        updatedisabled_or_enable(false)
        UserverResponse(null)
      }
  return (
    <>
    <div style={{marginTop:"10px"}}>
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                <TextField
                    type={datatypeprops}
                    name={name_of_type}
                    className="form-control float-left"
                    id={id__type}
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

    </div>
    </>
  )
}

export default FormUpdate