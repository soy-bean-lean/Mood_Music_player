import React, { useState, useRef , useEffect } from 'react';
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from "../TopBar";
import { TopShadowBar } from '../../style/TopShadowBar';

const DashBoard = ({AUTHORIZATION_TOKEN}) => {

    const image_size_button = {
        height: "50px",
        width: "50px",
    }

  return (
        <SideDivForAllComponents>
        <div className="_side_component_">
            <TopBar TopBarName="DashBoard" URL_WITH_OUT_LOGIN="/" URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>

                <div className='div_photo_and_trending'>
                    <div className="_mobile_view">
                            <TopShadowBar >
                                <div className='top_bar_with_shadow_class' style={{backgroundColor:'#9099fb'}}>
                                    <p style={{padding:"5px",fontWeight:"bold"}}>List of music</p>
                                </div>
                                and songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs listand songs list
                            </TopShadowBar>
                        </div>
                        <div className="_mobile_view">
                            <TopShadowBar >
                                <div className='top_bar_with_shadow_class' style={{backgroundColor:'#9099fb'}}>
                                    <p style={{padding:"5px",fontWeight:"bold"}}>Reviews</p>
                                </div>
                                All the reviewsAll the reviewsAll the reviewsAll the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews the reviews
                            </TopShadowBar>
                        </div>
            </div>
        </div>
    </SideDivForAllComponents>
  )
}

export default DashBoard