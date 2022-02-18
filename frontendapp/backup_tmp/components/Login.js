import React from "react";
import { SideDivForAllComponents } from '../style/SideDivForAllComponents';
import TopBar from './TopBar';
import LoginPage from './LoginPage'
// import { useNavigate } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';

const Login = ({AUTHORIZATION_TOKEN}) => {
  // console.log(AUTHORIZATION_TOKEN)
  // let navigate = useNavigate();

  return (
    <>
      {/* {(AUTHORIZATION_TOKEN)?
        <button onClick={
          navigate('/Dashboard')
        }>
          ....Loading...
        </button>
      : */}
        <SideDivForAllComponents>
        <div className="_side_component_">
            <TopBar TopBarName="Login" URL_TO_GO="" URL_WITH_OUT_LOGIN="signup" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
            <div className="_div_button_">
              <LoginPage AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
            </div>
        </div>
        </SideDivForAllComponents>
      {/* } */}
        </>
  )
}

export default Login