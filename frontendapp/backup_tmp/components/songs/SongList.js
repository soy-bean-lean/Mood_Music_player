import React from 'react';
import { SideDivForAllComponents } from '../../style/SideDivForAllComponents';
import TopBar from '../TopBar';
import { SongsListCategory } from '../../style/Listofsongs'
import ButtonCategoryLink from './ButtonCategoryLink'
import ListOfSongs from './ListOfSongs';

const SongList = ( {AUTHORIZATION_TOKEN}) => {

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
                        <ButtonCategoryLink CategoryName="happy" />
                        <ButtonCategoryLink CategoryName="sad" />
                        <ButtonCategoryLink CategoryName="surprise" />
                        <ButtonCategoryLink CategoryName="anger" />
                        <ButtonCategoryLink CategoryName="fear" />
                    </SongsListCategory>
                </div>
                <ListOfSongs />
            </div>
        </SideDivForAllComponents>
    </>
  )
};

export default SongList;
