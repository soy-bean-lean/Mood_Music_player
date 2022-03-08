import React , { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { BACKEND_URL_LOGOUT } from '../config/urls';
import axios from 'axios';
import { useDispatch } from "react-redux"
import { _save_access_token_,_save_refresh_token_ , __delete_refresh_token_} from '../features/JwtRefreshAccessToken'
import { unset_admin_} from '../features/IsAdmin'

const Logout = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
        // console.log(BACKEND_URL_LOGOUT)

    useEffect(()=>{
        console.log("logout")
        axios.post(BACKEND_URL_LOGOUT,{
            payload:null
        },{ withCredentials: true })
      .then((res) => {
          dispatch(unset_admin_(false));
          dispatch(__delete_refresh_token_(null))
          navigate("/login")
      })
      .catch((error) => {
        dispatch(unset_admin_(false));
        dispatch(__delete_refresh_token_(null))
        navigate("/login")
      })
    },[])
  return (
    <>
    <center>
        <h4>Logging Out</h4>
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
            alt="loggin out"
        />
    </center>
    </>
  )
}

export default Logout