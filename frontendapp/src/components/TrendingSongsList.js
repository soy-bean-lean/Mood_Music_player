import React from 'react';
import MusicTrendingData from './MusicTrendingData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";

const TrendingSongsList = ({AUTHORIZATION_TOKEN}) => {
  const _font_for_text_ = {
    fontFamily:"Comic Sans MS, Comic Sans, cursive",
}
  return (
     <>
    <br></br>
     <table className="table table-sm ">
      <thead >
          <tr className='table-active'>
          <th scope="col">
              <FontAwesomeIcon color="red" icon={faFire}></FontAwesomeIcon>
              <FontAwesomeIcon color="red" style={{marginLeft:"3px"}} icon={faFire}></FontAwesomeIcon>
          </th>
          <th scope="col" style={_font_for_text_}>Songs</th>
          <th scope="col" style={_font_for_text_}>Singer</th>
          </tr>
      </thead>
  <tbody>
  {/* Are you(Happy 😀) (sad 😔) (neutral 🙂) (fear 😳) (diguest 🤢) (surprise 😲) (angry 😡) */}
    <MusicTrendingData category="happy" _table_color_="table-primary" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    <MusicTrendingData category="sad" _table_color_="table-info" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    <MusicTrendingData category="surprise" _table_color_="table-warning" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    <MusicTrendingData category="angry" _table_color_="table-danger" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    <MusicTrendingData category="neutral" _table_color_="ddd" _text_color_="wheat"  color_from_props="#bd8ad3" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    {/* <MusicTrendingData category="diguest" _table_color_="test" _text_color_="wheat" color_from_props="black" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/> */}

  </tbody>
  </table>
     </>
  )
};

export default TrendingSongsList;
