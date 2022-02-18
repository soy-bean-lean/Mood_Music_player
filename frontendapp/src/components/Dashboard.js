import React , { useState,useEffect } from 'react';
import axios from 'axios';
import { GET_USER_DATA } from '../config/urls'
import {  useDispatch } from "react-redux"
import { _save_data_,_update_save_data_} from '../features/ProfileData'
import DashboardData from './Dashboard/DashboardData';

const Dashboard = ({AUTHORIZATION_TOKEN}) => {
    const dispatch = useDispatch()

    const [_load_spinner_, set_load_spinner_] = useState(true)

    function get_user_data(){
        axios.get(GET_USER_DATA,{
            headers:{
                'Authorization':`Bearer ${AUTHORIZATION_TOKEN}`
            }
        }).then((resp)=>{
            // console.log(resp.data)
            dispatch(_save_data_(resp.data));
            set_load_spinner_(false)
        }).catch((err)=>{
            console.log(err)
            dispatch(_save_data_([]));
        })
    }


    useEffect(() => {
        if(AUTHORIZATION_TOKEN){
            get_user_data()
        }else{
            console.log("???")
        }
    }, [])
return (
    <>
    {(_load_spinner_)?
        <DashboardData _proflile_pic_="Loading ...." _title_of_profile_data_="loading ...." AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    :
        <DashboardData _proflile_pic_="Profile pic" _title_of_profile_data_="Profile Data"  AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    }
</>
  )
};


export default Dashboard;
