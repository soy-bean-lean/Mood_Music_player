import React , {useState,useEffect} from "react";

import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { _save_access_token_,_save_refresh_token_ , __delete_refresh_token_} from './features/JwtRefreshAccessToken'


import Header from './Header'
import DrawerSideBar from  './DrawerSideBar'

import { BACK_END_REFRESH_TOKEN } from "./config/urls";

// import { useNavigate } from "react-router-dom";

function App() {
  // let navigate = useNavigate();

  // const [setJwt, UpdatesetJwt] = useState(null);
  let _token_from_redux_store_ = useSelector((state) => state.CountJwtRefreshAccessToken.JwtAccessToken)
  const dispatch = useDispatch()



  useEffect(() => {
    if(_token_from_redux_store_ != null){
    const interval = setInterval(() => {
      axios.post(BACK_END_REFRESH_TOKEN,{payload:null},{ withCredentials: true })
      .then((respose) => {
        console.log("updated access")
        console.log(respose.data['access'])
        // UpdatesetJwt(respose.data['access'])
        dispatch(_save_access_token_(respose.data['access']));

      })
      .catch((error) => {
        dispatch(__delete_refresh_token_(null));

      }).finally(()=>{
      })
    }, 3000);
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
        })
        .catch((error) => {
          dispatch(__delete_refresh_token_(null));
          console.log("not login")
          // navigate('/login')
        }).finally(()=>{
        })
      // }
},[]);



  return (
    <>

      {(_token_from_redux_store_)?
          <>
            <Header AUTHORIZATION_TOKEN={_token_from_redux_store_}/>
            <DrawerSideBar AUTHORIZATION_TOKEN={_token_from_redux_store_}/>
          </>
        :
          <>
            <Header />
            <DrawerSideBar />
          </>
      }
    </>
  );
}

export default App;

