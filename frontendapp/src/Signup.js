import React , {useEffect} from "react";

import TopBar from './components/TopBar';
import { SideDivForAllComponents } from './style/SideDivForAllComponents';
import Signuppage from './components/Signuppage';
import { useNavigate } from "react-router-dom";

const Signup = ({AUTHORIZATION_TOKEN}) => {
    // console.log(AUTHORIZATION_TOKEN)
    let navigate = useNavigate();

    useEffect(() => {
      if(AUTHORIZATION_TOKEN){
        navigate('/DashBoard')
      }
    }, [AUTHORIZATION_TOKEN])
  return (
<>
     <SideDivForAllComponents>
        <div className="_side_component_">
            <TopBar TopBarName="Create an account" URL_WITH_OUT_LOGIN="login" URL_TO_GO="" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
            <div className="_div_button_">
              <Signuppage />
            </div>
        </div>
        </SideDivForAllComponents>
    </>
  )
}

export default Signup