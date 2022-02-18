import React from 'react';
// import {SideDivForAllComponents,_div_center_} from '../style/SideDivForAllComponents'
import { SideDivForAllComponents,_div_center_ } from '../style/SideDivForAllComponents';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { MAIN_URL } from '../config/urls';

const PageNotFound = () => {
let navigate = useNavigate();

const _img_style_ ={
    width:"60%",
    height:"60%",
    borderRadius:"20px"
}
  return (
      <>
      <SideDivForAllComponents>
            <div className="_side_component_">
            <div className='_div_center_'>
            <center>
                <p style={{fontWeight:"bold"}}>Page Not found </p>
                <img src={MAIN_URL+"/data/Page_not_found.gif"} style={_img_style_} alt="Page not found"/><br></br>
               <Button variant="contained" onClick={() => navigate('/')} style={{margin:"10px"}}>Go Home</Button>
            </center>
            </div>
            </div>
        </SideDivForAllComponents>
        </>
  )
};

export default PageNotFound;