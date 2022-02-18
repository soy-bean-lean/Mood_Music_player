import React , {useState,useEffect} from "react";

import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { _save_access_token_,_save_refresh_token_ , __delete_refresh_token_} from './features/JwtRefreshAccessToken'
import jwt_decode from "jwt-decode";


import Header from './Header'
import DrawerSideBar from  './DrawerSideBar'

import { BACK_END_REFRESH_TOKEN , MAIN_URL } from "./config/urls";
import Admin from "./components/Admin/Admin";

function App() {

  const [loading, setloading] = useState(false);
  const [admin, setadmin] = useState(false);

  let _token_from_redux_store_ = useSelector((state) => state.CountJwtRefreshAccessToken.JwtAccessToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if(_token_from_redux_store_ != null){
    const interval = setInterval(() => {
      axios.post(BACK_END_REFRESH_TOKEN,{payload:null},{ withCredentials: true })
      .then((respose) => {
        // do nothing
        dispatch(_save_access_token_(respose.data['access']));

      })
      .catch((error) => {
        dispatch(__delete_refresh_token_(null));

      })
    // }, 1400);
  }, 240000);
    return () => clearInterval(interval);
  }
  }, [_token_from_redux_store_]);

  useEffect(() => {
    // if(_token_from_redux_store_ != null){
    axios.post(BACK_END_REFRESH_TOKEN,{payload:null},{ withCredentials: true })
        .then((respose) => {
          dispatch(_save_refresh_token_(respose.data['refresh']));
          dispatch(_save_access_token_(respose.data['access']));
          // UpdatesetJwt(respose.data['access'])
          setloading(true)
        })
        .catch((error) => {
          dispatch(__delete_refresh_token_(null));
          // console.log("not login")
          setloading(true)
        })
      // }
},[]);

useEffect(() => {
  if(_token_from_redux_store_!=null){
    var decoded = jwt_decode(_token_from_redux_store_);
    // console.log(decoded)
    if(decoded.is_superuser){
    setadmin(true)
  }
  }
}, [_token_from_redux_store_])

  return (
    <>

      {(loading)?
        (_token_from_redux_store_)?
            (admin)?
              <Admin AUTHORIZATION_TOKEN={_token_from_redux_store_}/>
            :
            <>
              <Header />
              <DrawerSideBar AUTHORIZATION_TOKEN={_token_from_redux_store_}/>
            </>
        :
          <>
            <Header />
            <DrawerSideBar AUTHORIZATION_TOKEN={_token_from_redux_store_}/>
          </>
          :
          <>
          <div style={{  margin: "auto",width: "50%",border: "1px solid green",padding: "10px"}}>
            <center>
              <p style={{fontSize:"20px",fontWeight:"bold"}}>loading .....</p>
              <img src={MAIN_URL+"/data/loading.gif"} style={{height:"50%",width:"50%"}} alt="loading...." />
            </center>
          </div>
          </>
      }
    </>
  );
}

export default App;

