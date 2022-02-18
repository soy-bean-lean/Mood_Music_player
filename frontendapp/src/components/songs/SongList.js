import React,{ useEffect } from 'react';
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from '../TopBar';
import { SongsListCategory } from '../../style/Listofsongs'
import ButtonCategoryLink from './ButtonCategoryLink'
import ListOfSongs from './ListOfSongs';
import { useNavigate } from "react-router-dom";

const SongList = ( {AUTHORIZATION_TOKEN}) => {
    let navigate = useNavigate();
    // useEffect(() => {
    //     if(AUTHORIZATION_TOKEN==null){
    //         navigate('/login')
    //     }
    // }, [])
    const _div_button_ = {
        display:"inline-block",
    }
  return (
    <>

     <SideDivForAllComponents>
            <div className="_side_component_">
                <TopBar TopBarName="List of Songs"  URL_TO_GO="/logout" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                <div className="_div_button_">
                    <SongsListCategory>
                        <ButtonCategoryLink CategoryName="happy" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                        <ButtonCategoryLink CategoryName="sad" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                        <ButtonCategoryLink CategoryName="surprise" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                        <ButtonCategoryLink CategoryName="anger" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                        <ButtonCategoryLink CategoryName="fear" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
                    </SongsListCategory>
                </div>
                <ListOfSongs AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
            </div>
        </SideDivForAllComponents>
    </>
  )
};

export default SongList;
