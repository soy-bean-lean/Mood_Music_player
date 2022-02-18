import React from 'react'

import TopBar from './components/TopBar';
import { SideDivForAllComponents } from './style/SideDivForAllComponents';
import Signuppage from './components/Signuppage';

const Signup = ({AUTHORIZATION_TOKEN}) => {
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