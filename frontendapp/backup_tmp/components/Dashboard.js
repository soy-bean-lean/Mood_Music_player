import React from 'react';
import { SideDivForAllComponents } from '../style/SideDivForAllComponents';
import TopBar from "./TopBar";

const Dashboard = ({AUTHORIZATION_TOKEN}) => {
return (
    <>
        <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName="DashBoard" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
            </div>
        </SideDivForAllComponents>
</>
  )
};


export default Dashboard;
