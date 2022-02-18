import React , { useState }from 'react'
import Select_options from "./Select_options";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BACKENDURL_SERVER_SONGS_FOR_ADMIN } from '../../../config/urls';

const Select_Update = ({AUTHORIZATION_TOKEN,value_data,data_send_from_url}) => {
    const [selection, setselection] = useState(value_data)
    const options = [
        {value:"angry",label:"Angry"},
        {value:"happy",label:"Happy"},
        {value:"fear",label:"Fear"},
        {value:"disgust",label:"Disgust"},
        {value:"neutral",label:"Neutral"},
        {value:"sad",label:"Sad"},
        {value:"surprise",label:"Surprise"},
    ]
    const notify = () => {

        toast("category updated")
    }
    const error_notify = (error_from_server) => {

        toast(error_from_server)
    }
    const _send_data= async(e) =>{
        console.log(e.value)
        setselection(e.value)
        axios.patch(BACKENDURL_SERVER_SONGS_FOR_ADMIN+data_send_from_url+"/",{
            category:e.value,
        },{
            headers: {
            'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
            }}).then((resr) => {
                notify()
        }).catch(err => {
            if(err.response.data["category"]){
            error_notify(err.response.data["category"][0])}
        })
    }
  return (
    <>
        Select Options
        <Select_options
            options_value={options}
            value={selection}
            onChange={
                (e)=>{
                _send_data(e)
                }
            }
        />
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

export default Select_Update