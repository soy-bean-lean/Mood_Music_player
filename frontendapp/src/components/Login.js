import React , {useEffect} from "react";
import { SideDivForAllComponents } from '../style/SideDivForAllComponents';
import TopBar from './TopBar';
import LoginPage from './LoginPage'
import { useNavigate } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';

const Login = ({AUTHORIZATION_TOKEN}) => {
  // console.log(AUTHORIZATION_TOKEN)
  useEffect(() => {
    document.title = "Login | Music Mood Player";
  }, [])
  let navigate = useNavigate();

  useEffect(() => {
    if(AUTHORIZATION_TOKEN){
      navigate('/music')
    }
  }, [AUTHORIZATION_TOKEN])
  return (
    <>
        <SideDivForAllComponents>
        <div className="_side_component_">
            <TopBar TopBarName="Login" URL_TO_GO="" URL_WITH_OUT_LOGIN="signup" />
            <div className="_div_button_">
              <LoginPage />
            </div>
        </div>
        </SideDivForAllComponents>
        </>
  )
}

export default Login